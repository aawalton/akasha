---
id: 7db175cb-cdd0-5d12-85c3-ec75006347fd
page-type-slug: page-property-definition
title: "Session tracking visual arts points"
defined-on-slug: page-type/session-tracking
key: visual-arts-points
type: number
expression: if(containsText(" " + prop(title) + " ", " art "), (if(prop(end-time) == null, now(), parseInstant(prop(end-time))) - parseInstant(prop(start-time))) / 60000, 0)
slug: session-tracking-visual-arts-points
domain-parent-slug: page-type/session-tracking
---

# Definition

- **Session tracking visual arts points** — the stretch's minutes where its title holds the word Art, and zero otherwise.
