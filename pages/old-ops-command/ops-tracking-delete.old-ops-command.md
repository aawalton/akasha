---
id: 339e859c-e23b-50b6-94e5-e33273c1abad
page-type-slug: old-ops-command
title: "Ops tracking delete"
slug: ops-tracking-delete
domain-parent-slug: domain/ops-tracking
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/tracking/delete.ts
path: tracking delete
---

# Definition

- **Ops tracking delete** — soft-deleting one session, so it leaves the day's totals and the status listing.

# Help

Remove a mis-created session block — the sanctioned path for clearing a block that should never have existed (a bad `start`/`switch` that left a zero-duration stub, a duplicate `log`). Identify the session by id (from `tracking status --json`). Takes the row off the sessions file beside its day: it vanishes from `tracking status` and contributes nothing to the day's aggregate points, because nothing is left to count. Works on open or closed sessions; deleting the OPEN block undoes a bad start/switch and leaves no open session. Fails loud on an unknown id.
