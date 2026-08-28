---
id: b7eeec10-0aa3-53d4-8b7a-40159b2b6766
page-type-slug: page-property-definition
title: "Persona percent progress"
defined-on-slug: page-type/persona
key: percent-progress
type: number
expression: (prop(total-points) >= 769*(prop(green-day-points)||10000)) && 100 || (prop(total-points) >= 229*(prop(green-day-points)||10000)) && ((prop(total-points) - 229*(prop(green-day-points)||10000)) / (540*(prop(green-day-points)||10000)) * 100) || (prop(total-points) >= 49*(prop(green-day-points)||10000)) && ((prop(total-points) - 49*(prop(green-day-points)||10000)) / (180*(prop(green-day-points)||10000)) * 100) || (prop(total-points) >= 7*(prop(green-day-points)||10000)) && ((prop(total-points) - 7*(prop(green-day-points)||10000)) / (42*(prop(green-day-points)||10000)) * 100) || (prop(total-points) / (7*(prop(green-day-points)||10000)) * 100)
slug: persona-percent-progress
domain-parent-slug: domain/persona-points
---

# Definition

- **Persona percent progress** — how far across her current rung a persona stands, as a percentage of the rung's width.
