---
id: b11fe274-e0fe-50ee-a567-0e4523ab54d7
page-type-slug: mp-readout
title: "Upkeep surplus"
slug: upkeep-surplus
domain-parent-slug: alan-harness-stoplights-upkeep
required-reading-slugs:
  - readout
label: Surplus
unit: hours
place: 2
scale-slug: readout-scale-surplus-hours
group-slugs:
  - alan-harness-stoplights-upkeep
  - readout-group-surplus
query-slug: surplus-hours-on-day
wire-key: surplus
settled: true
---

# Definition

- **Upkeep surplus** — how much of Alan's sleep the day has not spent.

# Design

The reading is what Alan slept less what the day cost.

A session that both cost and recovered counts its whole cost.
