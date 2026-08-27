---
id: 3d4305f2-97d7-56b4-a7b9-08f95ec2e308
page-type-slug: page-query
title: "Activity calories on day"
page-type: daily-tracking
takes:
  date: calendar-date
where:
  date:
    is: $date
function: sum
target: activity-calories
---
