---
id: 1a9bb922-de87-5801-ab28-dbf31c67f345
page-type-slug: page-property-definition
title: "Daily tracking fun level"
defined-on-slug: page-type/daily-tracking
key: fun-level
type: number
expression: 'case({fun-points} >= 2 -> 4, {fun-points} >= 1 -> 3, {fun-points} >= 0.5 -> 2, {fun-points} >= 0.25 -> 1, otherwise -> 0)'
slug: daily-tracking-fun-level
domain-parent-slug: page-type/daily-tracking
---

# Definition

- **Daily tracking fun level** — which of the four rungs the day's fun points reached.
