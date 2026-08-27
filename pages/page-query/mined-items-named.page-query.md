---
id: a6f6b0e6-e1fb-58cb-a134-3e139174e34f
slug: mined-items-named
page-type-slug: page-query
title: "Mined items named"
page-type: temper-mined-item
takes:
  q: text
where:
  name:
    contains: $q
limit: 20
keys:
  - itemId
  - name
  - icon
  - quality
  - itemType
  - filterType
  - setName
---
