---
id: f40664ea-86e9-5c00-9ab5-1fa291b19d5c
page-type-slug: page-property-definition
title: "Computer ram score"
defined-on-slug: page-type/computer
key: ram-score
type: number
expression: 'case({ram} == "64gb" -> 6400, {ram} == "32gb" -> 3200, {ram} == "16gb" -> 1600, {ram} == "12gb" -> 1200, otherwise -> 0)'
slug: computer-ram-score
domain-parent-slug: page-type/computer
---

# Definition

- **Computer ram score** — how much memory it carries, as a number that can be added up.
