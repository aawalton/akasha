---
id: 01a010d9-67dc-7000-a7cf-c8fa595d5532
page-type-slug: page-property-definition
title: "Collection completion"
defined-on-slug: page-type/collection
key: completion
type: select(slug)
expression: 'case({totalLengthInWords} > 0 && {totalRemainingInWords} <= 0 -> "completed", {totalProgressInWords} > 0 -> "in-progress", otherwise -> "not-started")'
values:
  - not-started
  - in-progress
  - completed
slug: collection-completion
domain-parent-slug: page-type/collection
---

# Definition

- **Collection completion** — a collection's progress as a stage rather than an amount.
