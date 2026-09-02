---
id: 11c64141-9b71-5da2-99bd-5685b1e66605
slug: session-capacity-on-day
page-type-slug: page-query
title: "Session capacity on day"
page-type: session-tracking
takes:
  date: tracking-day
where:
  daily-tracking-slug:
    is: $date
function: sum
target: health-capacity-hours
---
