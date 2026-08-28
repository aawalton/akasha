---
id: 01a015ad-d33c-7000-89df-5c93608804c9
page-type-slug: page-property-definition
title: "Seat conditions effort level"
defined-on-slug: page-type/seat-conditions
key: effort-level
type: select(lower-kebab-case) | none
values:
  - auto
  - low
  - medium
  - high
  - xhigh
  - max
required: true
slug: seat-conditions-effort-level
domain-parent-slug: page-type/seat-conditions
---

# Definition

- **Seat conditions effort level** — how much reasoning a seat's agent does at each step.

# Design

A stated level overrides what any subagent's own definition states.

A stated level stops `/effort` changing it for as long as the seat runs.

`none` leaves each model at its own default.
