---
id: 8e89438f-8df0-5f70-ad8f-5741ceec3cdf
page-type-slug: page-query
title: "Heard track by title key"
page-type: heard-track
takes:
  title-key: text
where:
  title-key:
    is: $title-key
limit: 1
keys:
  - id
  - first-heard-at
---
