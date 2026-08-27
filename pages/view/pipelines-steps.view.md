---
page-type-slug: view
title: Steps
id: 019db533-f3b3-7929-a34c-4fc034c4ef19
slug: pipelines-steps
nav: pipelines
page-type: step
sort-order: 2
where:
  status:
    in:
      - pending
      - dispatching
      - launching
      - running
      - failed
sort-by:
  - updated-at
group-by: status
page-size: 12
item-page-size: 12
group-page-size: 6
visible-properties:
  - step-name
  - status
  - page-type-id
hidden-properties-order:
  - pipeline-number
---
