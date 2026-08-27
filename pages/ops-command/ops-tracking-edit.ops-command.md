---
id: 686185d5-bad5-56fc-bd63-1dd900bdee41
page-type-slug: ops-command
title: "Ops tracking edit"
slug: ops-tracking-edit
domain-parent-slug: domain/ops-tracking
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/tracking/edit.ts
path: tracking edit
---

# Definition

- **Ops tracking edit** — changing a recorded session's fields, re-linking its day where the change moves it.

# Help

Correct an already-recorded session in place — the sanctioned path for amending a block's title, ratings, or timestamps (never hand-edit the row). Identify the session by id (from `tracking status --json`). When `--start` moves the block across the 06:00 reset onto a different ESO day, the day linkage is re-derived and re-linked automatically, so the block never drifts onto the wrong day. `--day <YYYY-MM-DD>` re-anchors the block to an explicitly inferred experienced day (sleep-anchored; precedence over the day derived from `--start`) — the re-anchor tool for moving a block across the sleep boundary once a later sleep resolves an earlier guess. Works on open or closed sessions; sets fields only — it does not re-open a closed block. Times accept HH:MM, 'YYYY-MM-DD HH:MM' (Mountain local), or ISO.
