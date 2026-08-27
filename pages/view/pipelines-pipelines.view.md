---
page-type-slug: view
title: Pipelines
id: 019e2427-80aa-7c09-8b8e-52a459718223
slug: pipelines-pipelines
nav: pipelines
page-type: pipeline
sort-order: 0
where:
  status:
    in:
      - pending
      - dispatching
      - running
      - failed
      - completed
sort-by:
  - seq
sort-descending:
  - seq
page-size: 12
item-page-size: 12
group-page-size: 6
visible-properties:
  - status
---
