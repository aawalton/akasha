---
id: b1f2c076-4162-5186-a6ba-f7d2cd77920c
page-type-slug: page-query
title: "Claude accounts next seven day back"
page-type: claude-account
where:
  seven-day-percent-used:
    at-or-after: "100"
  seven-day-resets-at:
    at-or-after: now
sort-by: seven-day-resets-at
limit: 1
keys:
  - seven-day-resets-at
---
