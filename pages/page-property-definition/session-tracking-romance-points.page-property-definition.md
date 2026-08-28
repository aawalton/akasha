---
id: 3fd07fda-4182-57c2-9920-a119b0533bb9
page-type-slug: page-property-definition
title: "Session tracking romance points"
defined-on-slug: page-type/session-tracking
key: romance-points
type: number
expression: if(containsText(" " + prop(title) + " ", " jen "), (if(prop(end-time) == null, now(), parseInstant(prop(end-time))) - parseInstant(prop(start-time))) / 60000, 0)
slug: session-tracking-romance-points
domain-parent-slug: page-type/session-tracking
---

# Definition

- **Session tracking romance points** — the stretch's minutes where its title holds the word Jen, and zero otherwise.
