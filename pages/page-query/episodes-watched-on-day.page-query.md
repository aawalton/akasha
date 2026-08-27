---
id: 69edc87c-2354-5872-ab60-242060c8612b
slug: episodes-watched-on-day
page-type-slug: page-query
title: "Episodes watched on a day"
page-type: episode
takes:
  day: calendar-date
where:
  completedAt:
    is: $day
function: sum
target: length
---
