---
id: 685482b0-02c3-5104-8a4b-85380c66a513
page-type-slug: page-property-definition
title: "Persona level"
defined-on-slug: page-type/persona
key: level
type: number
expression: (prop(total-points) >= 769*(prop(green-day-points)||10000)) && 5 || (prop(total-points) >= 229*(prop(green-day-points)||10000)) && 4 || (prop(total-points) >= 49*(prop(green-day-points)||10000)) && 3 || (prop(total-points) >= 7*(prop(green-day-points)||10000)) && 2 || 1
slug: persona-level
domain-parent-slug: domain/persona-points
---

# Definition

- **Persona level** — which of the five rungs of closeness a persona's points have reached.
