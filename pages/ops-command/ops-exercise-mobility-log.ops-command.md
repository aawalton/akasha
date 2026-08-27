---
id: 5f7a8b3a-788f-54cb-b1b2-4a4cb878660b
page-type-slug: ops-command
title: "Ops exercise mobility-log"
slug: ops-exercise-mobility-log
domain-parent-slug: domain/ops-exercise
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/exercise/mobility-log.ts
path: exercise mobility-log
---

# Definition

- **Ops exercise mobility-log** — appending one mobility reading to the time series, a human read with an optional number beside it.

# Help

Append a mobility/baseline reading (time-series — one row per measurement). --value is the always-present human read; --num is the optional computable value (e.g. SLR angle, wall-slide %) that feeds the digest trend line.
