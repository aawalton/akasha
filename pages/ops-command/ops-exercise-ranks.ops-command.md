---
id: f2cee137-8f2a-5308-a631-d07c30c312ec
page-type-slug: ops-command
title: "Ops exercise ranks"
slug: ops-exercise-ranks
domain-parent-slug: domain/ops-exercise
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/exercise/ranks.ts
path: exercise ranks
---

# Definition

- **Ops exercise ranks** — movements ordered by the blended selection objective, with each goal's score behind it.

# Help

Rank movements by the weighted selection objective, showing the per-goal breakdown (Longevity / Energy / Functionality / Aesthetics) behind each blended score. Pass --exercises to rank an explicit set (by id / title / unique substring); with no set, ranks the whole catalog and shows the top --limit. Weights are read from the selection-policy singleton.
