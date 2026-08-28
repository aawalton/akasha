---
id: 7227ec4f-aeb2-539a-8327-a7a970ebf771
page-type-slug: page-property-definition
title: "Daily tracking total level"
defined-on-slug: page-type/daily-tracking
key: total-level
type: number
expression: ((prop(faith-level) + prop(love-level) + prop(health-level) + prop(learn-level) + prop(fun-level) + prop(wealth-level)) >= 24) && 4 || ((prop(faith-level) + prop(love-level) + prop(health-level) + prop(learn-level) + prop(fun-level) + prop(wealth-level)) >= 18) && 3 || ((prop(faith-level) + prop(love-level) + prop(health-level) + prop(learn-level) + prop(fun-level) + prop(wealth-level)) >= 12) && 2 || ((prop(faith-level) + prop(love-level) + prop(health-level) + prop(learn-level) + prop(fun-level) + prop(wealth-level)) >= 6) && 1 || 0
slug: daily-tracking-total-level
domain-parent-slug: page-type/daily-tracking
---

# Definition

- **Daily tracking total level** — which of the four rungs the day's six values reached between them.
