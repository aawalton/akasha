---
id: dbf06786-3619-5932-92f6-8662cbd6d7b9
page-type-slug: old-ops-command
title: "Ops tower commit"
slug: ops-tower-commit
domain-parent-slug: domain/ops-tower
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/tower/commit.ts
path: tower commit
---

# Definition

- **Ops tower commit** — a TowerState JSON written back as the live Tower session.

# Help

Read a TowerState JSON and persist it as the live tower-session — the deterministic write half of a turn.

Reads { turn, hud, sheet, log, chapters } from the state it is given, Zod-parses it, and upserts the session under its external id. A session stands as a row on the game that holds it rather than as a file of its own, so the game is named alongside the session and defaults to the Tower. The inverse of `ops tower snapshot`.

Default stdout: a confirmation line. Asked for as JSON: { id, externalId, turn }.
