---
id: d8861576-6f09-55c3-8786-6a39ceac6fe6
page-type-slug: ops-command
title: "Ops tracking activity-set"
slug: ops-tracking-activity-set
domain-parent-slug: domain/ops-tracking
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/tracking/activity-set.ts
path: tracking activity-set
---

# Definition

- **Ops tracking activity-set** — the default difficulty a title rates at, written into the activity catalog.

# Help

Set an activity's default difficulty — the catalog `start` / `switch` / `log` rate a block from when `--difficulty` is omitted. Each activity title is matched case-insensitively as a substring of the session title, and the MAX default across every activity that matches wins, so title an activity as short as it can be and still be unambiguous (`Read`, `Jen`, `Church`) — it has to appear inside the session titles it should rate. An activity stands as a file named for its title, so re-running for one already in the catalog re-rates it in place rather than adding a second. This is the command the capture commands point at when they refuse a title nothing in the catalog matches.
