---
id: fd8002aa-64b7-5e97-a508-af23544756ba
slug: song-listen-by-play-key
page-type-slug: page-query
title: "Song listen by play key"
page-type: song-listen
takes:
  play-key: text
where:
  play-key:
    is: $play-key
limit: 1
keys:
  - id
  - played-at
---
