---
id: 3fd07fda-4182-57c2-9920-a119b0533bb9
page-type-slug: page-property-definition
title: "Session tracking romance points"
defined-on-slug: page-type/session-tracking
key: romance-points
type: number
expression: 'case(hasWord({title}, "jen") -> (hoursBetween({start-time}, {end-time}) ?? hoursBetween({start-time}, now())) * 60, otherwise -> 0)'
slug: session-tracking-romance-points
domain-parent-slug: page-type/session-tracking
---

# Definition

- **Session tracking romance points** — the stretch's minutes where its title holds the word Jen, and zero otherwise.
