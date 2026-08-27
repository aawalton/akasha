---
id: 00f85b13-7254-5145-95e6-0f961f2bc74d
page-type-slug: ops-command
title: "Ops tracking status"
slug: ops-tracking-status
domain-parent-slug: domain/ops-tracking
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/tracking/status.ts
path: tracking status
---

# Definition

- **Ops tracking status** — the open session and one day's finished blocks, read without writing.

# Help

Show the current open session (if any) and a day's tracked blocks. Defaults to today's ESO day; pass `--date` for a past day. Read-only — lists each block's span, duration, and safety/difficulty ratings. Stress-capacity hours are a view-computed formula on the daily page; see them in the app, not here.
