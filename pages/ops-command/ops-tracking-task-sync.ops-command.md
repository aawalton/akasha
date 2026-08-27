---
id: c619dca2-f5df-5762-b048-d76785bf7867
page-type-slug: ops-command
title: "Ops tracking task-sync"
slug: ops-tracking-task-sync
domain-parent-slug: domain/ops-tracking
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/tracking/task-sync.ts
path: tracking task-sync
---

# Definition

- **Ops tracking task-sync** — rewriting one day's task figure from the Health tasks completed in it.

# Help

Recompute a day's `taskPoints` from completed `value`->Health tasks and write it onto the daily-tracking page. Each completion scores its difficulty tier (Trivial 25 / Light 50 / Hard 100 / Major 250); a task with no difficulty (or one already scored by another pillar, e.g. Breakfast via nutrition) contributes 0. The reader unions `completed-task` rows with any `to-do` whose last completion falls in the window, deduped by to-do slug, so running this right after completing tasks reflects them immediately even before the snapshot automation lands. A completion whose `to-do` has since been deleted carries no difficulty and so scores 0. A day with no health completions writes 0 (measured-zero). Defaults to today's ESO day; pass `--date` for a past day.
