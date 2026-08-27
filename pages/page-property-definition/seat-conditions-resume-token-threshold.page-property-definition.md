---
id: 01a0160e-d90c-7001-abac-475e19ddc7e3
page-type-slug: page-property-definition
title: "Seat conditions resume token threshold"
defined-on-slug: page-type/seat-conditions
key: resume-token-threshold
type: number
default: 2147483647
slug: seat-conditions-resume-token-threshold
domain-parent-slug: page-type/seat-conditions
---

# Definition

- **Seat conditions resume token threshold** — how many tokens a seat's session must hold before starting it offers the resume menu.

# Design

Only a headless seat carries this.

The default is a token count no seat reaches, which is how the menu never appears.
