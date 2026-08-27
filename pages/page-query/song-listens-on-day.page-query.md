---
id: 1b96cec7-dc78-52cd-a117-a2a6769723cb
slug: song-listens-on-day
page-type-slug: page-query
title: "Song listens on a day"
page-type: song-listen
takes:
  persona-slug: text
  date: calendar-date
where:
  persona-slug:
    is: $persona-slug
  date:
    is: $date
function: sum
target: new-music-minutes
---
