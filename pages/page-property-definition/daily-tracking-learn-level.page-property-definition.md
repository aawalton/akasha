---
id: 55fc8bfa-9650-5d50-8003-23fbbac5ce02
page-type-slug: page-property-definition
title: "Daily tracking learn level"
defined-on-slug: page-type/daily-tracking
key: learn-level
type: number
expression: 'case({learn-points} >= 2 -> 4, {learn-points} >= 1 -> 3, {learn-points} >= 0.5 -> 2, {learn-points} >= 0.25 -> 1, otherwise -> 0)'
slug: daily-tracking-learn-level
domain-parent-slug: page-type/daily-tracking
---

# Definition

- **Daily tracking learn level** — which of the four rungs the day's learn points reached.
