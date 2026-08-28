---
id: b7eeec10-0aa3-53d4-8b7a-40159b2b6766
page-type-slug: page-property-definition
title: "Persona percent progress"
defined-on-slug: page-type/persona
key: percent-progress
type: number
expression: 'case(({total-points} ?? 0) >= 769 * ({green-day-points} ?? 10000) -> 100, ({total-points} ?? 0) >= 229 * ({green-day-points} ?? 10000) -> (({total-points} ?? 0) - 229 * ({green-day-points} ?? 10000)) / (540 * ({green-day-points} ?? 10000)) * 100, ({total-points} ?? 0) >= 49 * ({green-day-points} ?? 10000) -> (({total-points} ?? 0) - 49 * ({green-day-points} ?? 10000)) / (180 * ({green-day-points} ?? 10000)) * 100, ({total-points} ?? 0) >= 7 * ({green-day-points} ?? 10000) -> (({total-points} ?? 0) - 7 * ({green-day-points} ?? 10000)) / (42 * ({green-day-points} ?? 10000)) * 100, otherwise -> ({total-points} ?? 0) / (7 * ({green-day-points} ?? 10000)) * 100)'
slug: persona-percent-progress
domain-parent-slug: domain/persona-points
---

# Definition

- **Persona percent progress** — how far across her current rung a persona stands, as a percentage of the rung's width.
