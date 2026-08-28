---
id: 3932c20f-d7f0-575e-8ba0-8367806910e5
page-type-slug: page-property-definition
title: "Session tracking sleep hours"
defined-on-slug: page-type/session-tracking
key: sleep-hours
type: number
expression: 'case(hasWord({title}, "sleep") -> hoursBetween({start-time}, {end-time}), hasWord({title}, "rest") -> hoursBetween({start-time}, {end-time}), otherwise -> 0) ?? 0'
slug: session-tracking-sleep-hours
domain-parent-slug: page-type/session-tracking
---

# Definition

- **Session tracking sleep hours** — the hours a stretch of sleep or rest ran, and none where the stretch was neither.

# Design

A stretch still open counts nothing, rather than counting up to now.
