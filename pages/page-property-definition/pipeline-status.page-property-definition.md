---
id: 5fcc48b5-6929-522c-a5c7-02f883d226c4
page-type-slug: page-property-definition
title: "Pipeline status"
defined-on-slug: page-type/pipeline
key: status
type: select(lower-kebab-case)
values:
  - pending
  - dispatching
  - running
  - passed
  - failed
  - answered-elsewhere
  - overtaken
required: true
slug: pipeline-status
domain-parent-slug: page-type/pipeline
---

# Definition

- **Pipeline status** — where a pipeline stands between being minted and reaching its verdict.
