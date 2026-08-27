---
id: 827498bc-08f7-5daf-a05b-9380ea2c4720
page-type-slug: page-query
title: "Messages to"
page-type: message
takes:
  to: text
where:
  to:
    is: $to
keys:
  - to
  - from
  - warrant
  - claimed-at
  - body
---
