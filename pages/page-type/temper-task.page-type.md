---
page-type-slug: page-type
title: "Temper task"
id: 019db533-f381-72c5-89ed-c2eb485e5e94
extends-slug: page
files: akasha:**/*.temper-task.md
body-shape-slug: empty
owner-slug: account
slug: temper-task
plural-slug: temper-tasks
domain-parent-slug: domain/alan-harness-tracking-source
required-reading-slugs:
  - domain/temper
---

# Definition

- **Temper task** — something to be done in the game, standing until it is done and returning if it recurs.

# Design

A task's recurrence is spelled as two values rather than one nested one, so that both survive being read back from a file.

A task that recurs is never finished: completing it files a record and moves its due date on.
