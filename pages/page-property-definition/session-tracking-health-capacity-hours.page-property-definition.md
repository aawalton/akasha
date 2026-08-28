---
id: 592a62c3-e75f-584a-9ada-8a458ea6edea
page-type-slug: page-property-definition
title: "Session tracking health capacity hours"
defined-on-slug: page-type/session-tracking
key: health-capacity-hours
type: number
expression: '(hoursBetween({start-time}, {end-time}) ?? hoursBetween({start-time}, now())) * (({recovery-multiplier} ?? 0) - ({cost-multiplier} ?? 0))'
slug: session-tracking-health-capacity-hours
domain-parent-slug: page-type/session-tracking
---

# Definition

- **Session tracking health capacity hours** — how much stress capacity the whole stretch gave back or took.
