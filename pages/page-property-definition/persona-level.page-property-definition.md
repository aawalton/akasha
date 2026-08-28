---
id: 685482b0-02c3-5104-8a4b-85380c66a513
page-type-slug: page-property-definition
title: "Persona level"
defined-on-slug: page-type/persona
key: level
type: number
expression: 'case({total-points} >= 769 * ({green-day-points} ?? 10000) -> 5, {total-points} >= 229 * ({green-day-points} ?? 10000) -> 4, {total-points} >= 49 * ({green-day-points} ?? 10000) -> 3, {total-points} >= 7 * ({green-day-points} ?? 10000) -> 2, otherwise -> 1)'
slug: persona-level
domain-parent-slug: domain/persona-points
---

# Definition

- **Persona level** — which of the five rungs of closeness a persona's points have reached.
