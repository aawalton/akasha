---
id: fc6138fe-1cc5-505a-8176-72a78fadc91d
page-type-slug: page-property-definition
title: "Daily tracking love level"
defined-on-slug: page-type/daily-tracking
key: love-level
type: number
expression: 'case({love-points} >= 2 -> 4, {love-points} >= 1 -> 3, {love-points} >= 0.5 -> 2, {love-points} >= 0.25 -> 1, otherwise -> 0)'
slug: daily-tracking-love-level
domain-parent-slug: page-type/daily-tracking
---

# Definition

- **Daily tracking love level** — which of the four rungs the day's love points reached.
