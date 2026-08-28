---
id: 7dbc0d0d-bf69-5124-876a-343afcff7b80
page-type-slug: page-property-definition
title: "Computer server score"
defined-on-slug: page-type/computer
key: server-score
type: number
expression: 'case({status} != "needs-repair" -> ({cpu-score} ?? 0) * 0.5 + ({ram-score} ?? 0) * 0.3 + ({storage-score} ?? 0) * 0.2 + case({form-factor} == "desktop" -> 10, otherwise -> 0), otherwise -> 0)'
slug: computer-server-score
domain-parent-slug: page-type/computer
---

# Definition

- **Computer server score** — how well the machine would serve as a always-on host.
