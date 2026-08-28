---
id: 15c02f03-c7d6-5468-a4d3-b468e6ab87ca
page-type-slug: page-property-definition
title: "Daily tracking health level"
defined-on-slug: page-type/daily-tracking
key: health-level
type: number
expression: (prop(health-points) >= 2) && 4 || (prop(health-points) >= 1) && 3 || (prop(health-points) >= 0.5) && 2 || (prop(health-points) >= 0.25) && 1 || 0
slug: daily-tracking-health-level
domain-parent-slug: page-type/daily-tracking
---

# Definition

- **Daily tracking health level** — which of the four rungs the day's health points reached.
