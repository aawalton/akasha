---
id: d1fbb1e7-ec61-54e3-a0ad-771fbe5f5ea9
page-type-slug: old-ops-command
title: "Ops tracking strength-sync"
slug: ops-tracking-strength-sync
domain-parent-slug: domain/ops-tracking
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/tracking/strength-sync.ts
path: tracking strength-sync
---

# Definition

- **Ops tracking strength-sync** — rewriting one day's strength volume from the workouts recorded against it.

# Help

Recompute a day's `strengthVolume` (total pounds lifted) from the day's `workout-session` volume and write it onto the daily-tracking row (`strengthPoints` is the formula `strengthVolume / 70`, computed on read). Finishing a workout already triggers this rollup live via the daily-tracking worker, so this is the on-demand refresh / past-day repair path — recompute a past day, or square a day whose row drifted. A day with no sessions writes 0 (measured-zero). Defaults to today's ESO day; pass `--date` for a past day. The same rollup also runs opportunistically on commits, so this is the on-demand refresh when you want the number fresh now.
