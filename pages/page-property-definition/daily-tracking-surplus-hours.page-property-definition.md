---
id: 642b022f-5327-5f34-b497-144a542aa829
page-type-slug: page-property-definition
title: "Daily tracking surplus hours"
defined-on-slug: page-type/daily-tracking
key: surplus-hours
type: number
expression: if(prop(sleep-hours) == null, 0, prop(sleep-hours)) - if(prop(spend-hours) == null, 0, prop(spend-hours))
slug: daily-tracking-surplus-hours
domain-parent-slug: page-type/daily-tracking
---

# Definition

- **Daily tracking surplus hours** — how much of the night's sleep the day has not spent.
