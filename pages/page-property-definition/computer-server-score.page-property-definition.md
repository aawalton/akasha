---
id: 7dbc0d0d-bf69-5124-876a-343afcff7b80
page-type-slug: page-property-definition
title: "Computer server score"
defined-on-slug: page-type/computer
key: server-score
type: number
expression: (status != "needs-repair") * (cpuScore * 0.5 + ramScore * 0.3 + storageScore * 0.2 + (formFactor == "desktop") * 10)
slug: computer-server-score
domain-parent-slug: page-type/computer
---

# Definition

- **Computer server score** — how well the machine would serve as a always-on host.
