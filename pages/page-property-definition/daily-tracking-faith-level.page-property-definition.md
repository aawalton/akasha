---
id: f7abd85d-1743-5f19-b7f1-e12fd70a1289
page-type-slug: page-property-definition
title: "Daily tracking faith level"
defined-on-slug: page-type/daily-tracking
key: faith-level
type: number
expression: 'case({faith-points} >= 2 -> 4, {faith-points} >= 1 -> 3, {faith-points} >= 0.5 -> 2, {faith-points} >= 0.25 -> 1, otherwise -> 0)'
slug: daily-tracking-faith-level
domain-parent-slug: page-type/daily-tracking
---

# Definition

- **Daily tracking faith level** — which of the four rungs the day's faith points reached.
