---
id: 3407a7b6-2590-53c5-bfea-63a4927fd674
page-type-slug: page-property-definition
title: "Workflow status"
defined-on-slug: page-type/workflow
key: status
type: select(lower-kebab-case)
values:
  - pending
  - dispatching
  - running
  - passed
  - failed
  - blocked
  - skipped
  - answered-elsewhere
  - overtaken
required: true
slug: workflow-status
domain-parent-slug: page-type/workflow
---

# Definition

- **Workflow status** — where a workflow stands between being minted and reaching its verdict.
