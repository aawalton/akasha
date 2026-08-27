---
id: 3e18c9ac-e968-5b00-86a8-168a6bfd11bf
page-type-slug: old-ops-command
title: "Ops exercise constraint-set"
slug: ops-exercise-constraint-set
domain-parent-slug: domain/ops-exercise
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/exercise/constraint-set.ts
path: exercise constraint-set
---

# Definition

- **Ops exercise constraint-set** — upserting one coaching constraint by title, with its kind, focus tags and active state.

# Help

Upsert a coaching-constraint by title (the first call creates it, later calls patch in place). Records a durable standing cue/constraint the pre-session digest surfaces for matching focuses. Active by default — pass --inactive to retire one.
