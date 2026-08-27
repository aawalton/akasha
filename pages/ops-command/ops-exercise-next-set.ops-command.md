---
id: ed83c4a9-1919-51f2-b028-c0e9758ddffd
page-type-slug: ops-command
title: "Ops exercise next-set"
slug: ops-exercise-next-set
domain-parent-slug: domain/ops-exercise
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/exercise/next-set.ts
path: exercise next-set
---

# Definition

- **Ops exercise next-set** — the one set to perform next, re-derived from what the open session already holds.

# Help

Emit the ONE next set to perform — movement, set number, target reps, target load, target RIR, and a short why. Re-derived from live session state on every call, so session length and structure stay open: log the set you just did, call this again, and the next set responds to what actually happened. A set at RIR ≤ 1, one whose reps fell below the target floor, or a --skip of a movement already worked, ends that movement for today and the loop moves on. Emits no projected plan — use `ops exercise select` for the whole shape and the full decision envelope.
