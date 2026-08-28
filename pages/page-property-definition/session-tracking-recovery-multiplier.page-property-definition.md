---
id: d3805a95-7650-5d34-a4ec-bc794296a7fa
page-type-slug: page-property-definition
title: "Session tracking recovery multiplier"
defined-on-slug: page-type/session-tracking
key: recovery-multiplier
type: number
expression: 'case(hasWord({title}, "bath") -> 3, hasWord({title}, "pod") -> 3, hasWord({title}, "breathing") -> 1, hasWord({title}, "sleep") -> 1, hasWord({title}, "rest") -> 1, otherwise -> 0)'
slug: session-tracking-recovery-multiplier
domain-parent-slug: page-type/session-tracking
---

# Definition

- **Session tracking recovery multiplier** — how many hours of stress capacity an hour of it gives back.

# Design

A token counts only as a whole word in the title, so `Sleepy` is not `Sleep`.

Where two tokens match, the first named wins rather than the largest.
