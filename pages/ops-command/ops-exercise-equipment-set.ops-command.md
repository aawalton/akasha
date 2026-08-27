---
id: 57c6900c-238c-58b8-8147-87258f26918d
page-type-slug: ops-command
title: "Ops exercise equipment-set"
slug: ops-exercise-equipment-set
domain-parent-slug: domain/ops-exercise
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/exercise/equipment-set.ts
path: exercise equipment-set
---

# Definition

- **Ops exercise equipment-set** — upserting one equipment item by title, with its category, configuration and load increments.

# Help

Upsert an equipment-item by title (the first call creates it, later calls patch in place). Records available implements + their load increments for the pre-session digest. Equipment is available by default — pass --unavailable for a proposed/future implement.
