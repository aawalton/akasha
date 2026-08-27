---
id: 12eb974d-9627-54c4-b152-30988a09c344
page-type-slug: old-ops-command
title: "Ops tower state"
slug: ops-tower-state
domain-parent-slug: domain/ops-tower
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/tower/state.ts
path: tower state
---

# Definition

- **Ops tower state** — the live Tower session's current state, as a human summary or as full TowerState JSON.

# Help

Read the live Tower session and print its current state. The session is found by its external id, under the game whose rows hold it.

Default stdout: a human summary (external id, turn, HUD pools). Asked for as JSON: the full revealed TowerState { turn, hud, sheet, log, chapters }.

Read-only. The session sheet is the revealed (fog-of-war) projection — never the coordinator's canonical truth.
