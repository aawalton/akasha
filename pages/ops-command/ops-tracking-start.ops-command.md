---
id: 7edcca99-5ab4-56f5-b8ef-08c05bf4bd9c
page-type-slug: ops-command
title: "Ops tracking start"
slug: ops-tracking-start
domain-parent-slug: domain/ops-tracking
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/tracking/start.ts
path: tracking start
---

# Definition

- **Ops tracking start** — opening a live session at an instant, refused while another is open.

# Help

Open a live time-tracking session with a descriptive title. Refuses when a session is already open (use `tracking switch` to transition, or `tracking close` to stop first). Resolves-or-creates today's daily-tracking row and links the session. `--at` overrides the start instant (default now). `--safety` defaults to the most-recent prior closed block's safety (the state Alan is in rarely flips between blocks), and stays unrated when there is nothing to carry; `--difficulty` defaults to the matching `session-activity` default for the title (max when several match), and a title no activity matches is REFUSED rather than written unrated — pass `--difficulty`, or add the activity with `tracking activity-set`. `--relationship` tags the session with one or more relationships (by id or name); repeat the flag or pass a comma-separated list.
