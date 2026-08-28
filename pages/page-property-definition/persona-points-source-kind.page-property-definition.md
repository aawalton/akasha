---
id: 15aa7b0a-a4f3-52a0-8857-619df054df9e
page-type-slug: page-property-definition
title: "Persona points source kind"
defined-on-slug: page-type/persona-points-source
key: kind
type: select(lower-kebab-case)
values:
  - external
  - windowed
  - direct
  - manual
  - seed
  - stoplights
  - unavailable
slug: persona-points-source-kind
domain-parent-slug: page-type/persona-points-source
---

# Definition

- **Persona points source kind** — how a persona's points are worked out from what she counts.

# Design

A source the engine cannot work out on its own is `external`, and something else writes her points instead.
