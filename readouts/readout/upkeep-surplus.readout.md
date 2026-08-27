---
id: cecd580d-83f5-58e8-b2fe-c8c65f665cdf
page-type-slug: readout
title: "Upkeep surplus"
slug: upkeep-surplus
domain-parent-slug: readout-group/upkeep
required-reading-slugs:
  - page-type/readout
label: Surplus
unit: hours
place: 2
scale-slug: surplus-hours
group-slugs:
  - upkeep
  - surplus
query-slug: surplus-hours-on-day
wire-key: surplus
settled: true
enabled: false
---

# Definition

- **Upkeep surplus** — how much of Alan's sleep the day has not spent.

# Design

The reading is what Alan slept less what the day cost.

A session that both cost and recovered counts its whole cost.
