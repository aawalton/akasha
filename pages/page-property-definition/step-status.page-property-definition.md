---
id: ba13dc40-3047-5743-b0f7-4d0bbcf7a89e
page-type-slug: page-property-definition
title: "Step status"
defined-on-slug: page-type/step
key: status
type: select(lower-kebab-case)
values:
  - pending
  - dispatching
  - launching
  - running
  - passed
  - failed
  - blocked
  - skipped
  - answered-elsewhere
  - overtaken
default: pending
uncommitted: true
slug: step-status
domain-parent-slug: page-type/step
---

# Definition

- **Step status** — where a step stands between being minted and reaching its verdict.
