---
id: 3f4996de-eb1d-5e07-849c-1bb49968d5e1
page-type-slug: page-property-definition
title: "Daily tracking wealth level"
defined-on-slug: page-type/daily-tracking
key: wealth-level
type: number
expression: (prop(wealth-points) >= 2) && 4 || (prop(wealth-points) >= 1) && 3 || (prop(wealth-points) >= 0.5) && 2 || (prop(wealth-points) >= 0.25) && 1 || 0
slug: daily-tracking-wealth-level
domain-parent-slug: page-type/daily-tracking
---

# Definition

- **Daily tracking wealth level** — which of the four rungs the day's wealth points reached.
