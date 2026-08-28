---
id: 3932c20f-d7f0-575e-8ba0-8367806910e5
page-type-slug: page-property-definition
title: "Session tracking sleep hours"
defined-on-slug: page-type/session-tracking
key: sleep-hours
type: number
expression: if(prop(end-time) == null, 0, if(containsText(" " + prop(title) + " ", " sleep "), (parseInstant(prop(end-time)) - parseInstant(prop(start-time))) / 3600000, if(containsText(" " + prop(title) + " ", " rest "), (parseInstant(prop(end-time)) - parseInstant(prop(start-time))) / 3600000, 0)))
slug: session-tracking-sleep-hours
domain-parent-slug: page-type/session-tracking
---

# Definition

- **Session tracking sleep hours** — the hours a stretch of sleep or rest ran, and none where the stretch was neither.

# Design

A stretch still open counts nothing, rather than counting up to now.
