---
id: cecd580d-83f5-58e8-b2fe-c8c65f665cdf
page-type-slug: mp-readout
title: "Upkeep surplus"
slug: upkeep-surplus
domain-parent-slug: upkeep
required-reading-slugs:
  - readout
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
---

# Definition

- **Upkeep surplus** — how much of Alan's sleep the day has not spent.

# Design

The reading is what Alan slept less what the day cost.

A session that both cost and recovered counts its whole cost.
