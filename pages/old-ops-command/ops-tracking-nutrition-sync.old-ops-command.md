---
id: ee44f3ee-28bc-5799-b55f-788149c8883a
page-type-slug: old-ops-command
title: "Ops tracking nutrition-sync"
slug: ops-tracking-nutrition-sync
domain-parent-slug: domain/ops-tracking
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/tracking/nutrition-sync.ts
path: tracking nutrition-sync
---

# Definition

- **Ops tracking nutrition-sync** — rewriting one day's nutrition figure from the food rows logged against it.

# Help

Recompute a day's `nutritionPoints` from its logged `food` rows (1 point per whole-plant gram) and write it onto the daily-tracking row. `ops food log` already refreshes the day live after each entry, so this is the manual backstop / repair path — recompute a past day, or a day whose row drifted. A day with no food rows writes 0 (measured-zero). Defaults to today's ESO day; pass `--date` for a past day.
