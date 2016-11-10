var http = require('http');
var fs = require("fs");
var server = http.createServer(function(req, res) {
    fs.readFile(__dirname + req.url, function(err, data) {//req.url='/test.csv'
        if (err) {
            return console.error(err);
        }
        console.log("异步读取: " + data);

        res.writeHeader(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
            'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS', //跨域设置，为了测试方便
            'Content-Type': 'text/plain;charset=gb2312' //关键代码 添加charset=gb2312
        });
        if (req.method == 'OPTIONS') {
            res.send(200); //让options请求快速返回，可以忽略
        } else {
            res.end(data); //关键代码
        }
    });
});
server.listen(8888); //关键代码 使服务器监听8888端口，
console.log("http server running on port 8888 ...");