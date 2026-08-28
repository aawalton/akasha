---
id: 6f5f3ead-fe5f-5994-9bd5-1a0c90e5cbf9
page-type-slug: page-property-definition
title: "Session tracking spend hours"
defined-on-slug: page-type/session-tracking
key: spend-hours
type: number
expression: (if(prop(end-time) == null, now(), parseInstant(prop(end-time))) - parseInstant(prop(start-time))) / 3600000 * if(prop(safety-gap) == null, 0, if(prop(safety-gap) >= 1, 0, if(prop(safety-gap) >= 0, 1 - prop(safety-gap), if(prop(safety-gap) <= -5, 32, if(prop(safety-gap) == -0.5, 1.5, if(prop(safety-gap) == -1, 2, if(prop(safety-gap) == -1.5, 3, if(prop(safety-gap) == -2, 4, if(prop(safety-gap) == -2.5, 6, if(prop(safety-gap) == -3, 8, if(prop(safety-gap) == -3.5, 12, if(prop(safety-gap) == -4, 16, if(prop(safety-gap) == -4.5, 24, 0)))))))))))))
slug: session-tracking-spend-hours
domain-parent-slug: page-type/session-tracking
---

# Definition

- **Session tracking spend hours** — what the stretch cost, its hours weighted by how far its difficulty stood above its safety.
