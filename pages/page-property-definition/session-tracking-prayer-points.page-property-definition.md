---
id: 647ad61e-a16f-58b0-b080-1ee69b36ba62
page-type-slug: page-property-definition
title: "Session tracking prayer points"
defined-on-slug: page-type/session-tracking
key: prayer-points
type: number
expression: 'case(hasWord({title}, "pray") -> (hoursBetween({start-time}, {end-time}) ?? hoursBetween({start-time}, now())) * 60, otherwise -> 0)'
slug: session-tracking-prayer-points
domain-parent-slug: page-type/session-tracking
---

# Definition

- **Session tracking prayer points** — the stretch's minutes where its title holds the word Pray, and zero otherwise.
