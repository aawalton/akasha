---
id: 6cf58b9b-d7ad-5255-b69f-dcd5046e065c
slug: main-pipelines-unfinished
page-type-slug: page-query
title: "Main pipelines unfinished"
page-type: pipeline
where:
  branch:
    is: main
  status:
    in:
      - pending
      - dispatching
      - running
---
