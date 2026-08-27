---
id: 59ba174c-d3fc-5602-a41e-fba0681e1add
page-type-slug: page-query
title: "Heard track by spotify id"
page-type: heard-track
takes:
  spotify-track-id: text
where:
  spotify-track-id:
    is: $spotify-track-id
limit: 1
keys:
  - id
  - first-heard-at
---
