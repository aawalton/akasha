---
id: f2fb6da6-81ba-50f2-bd7c-e00471c27808
slug: safety-level-on-day
page-type-slug: page-query
title: "Safety level on a day"
page-type: session-tracking
takes:
  date: calendar-date
where:
  daily-tracking-slug:
    is: $date
  safety-level:
    empty: false
sort-by: start-time
descending: true
limit: 1
keys:
  - daily-tracking-slug
  - start-time
  - safety-level
---
