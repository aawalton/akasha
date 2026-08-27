---
id: 0fbfd0bb-6f79-5c47-a18b-8f71a06c1566
page-type-slug: ops-command
title: "Ops tower snapshot"
slug: ops-tower-snapshot
domain-parent-slug: domain/ops-tower
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/tower/snapshot.ts
path: tower snapshot
---

# Definition

- **Ops tower snapshot** — the live Tower session read out of the store as TowerState JSON.

# Help

Emit the live Tower session's latest pages state as the full TowerState JSON — the deterministic read half of a turn.

Reads the tower-session by its external id, under the game whose rows hold it, and writes { turn, hud, sheet, log, chapters } to stdout. Pipe it through a transform and back into `ops tower commit` to write the next state.

Read-only. The session sheet is the revealed (fog-of-war) projection.

Default stdout: a single line of JSON, indented on request.
