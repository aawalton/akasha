---
id: 7bfb41e1-e5a6-5be5-87c2-3e332e7417fa
page-type-slug: old-ops-command
title: "Ops tracking cardio-sync"
slug: ops-tracking-cardio-sync
domain-parent-slug: domain/ops-tracking
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/tracking/cardio-sync.ts
path: tracking cardio-sync
---

# Definition

- **Ops tracking cardio-sync** — rewriting one day's active calories from the health samples standing against its waking hours.

# Design

A day the samples say nothing about is left as it stands rather than written to zero.

# Help

Recompute a day's `activeCalories` from the active-energy health samples recorded for it, and write the figure onto the day. The window read is the day's waking span, taken from its sessions, so a day whose sleep was recorded differently reads a different span. A day the samples say nothing about writes nothing and reports `unmeasured`, which is how a watch that stopped sending reads here — distinct from a measured zero. Defaults to today's ESO day; pass `--date` for a past day.
