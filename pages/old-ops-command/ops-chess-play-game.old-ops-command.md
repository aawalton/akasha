---
id: 5b492dfd-1719-52ac-9451-dd7d74595adf
page-type-slug: old-ops-command
title: "Ops chess play-game"
slug: ops-chess-play-game
domain-parent-slug: domain/ops-chess
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/chess/play-game.ts
path: chess play-game
---

# Definition

- **Ops chess play-game** — a whole game played from stdin against Maia, landed as a chess-game page.

# Help

Play a full game against Maia — an open-weights neural engine that plays human-like at a chosen rating band — then land it as a reviewable chess-game page, its moves standing beside it as a PGN file.

Moves are read one per line from stdin as UCI long algebraic (e.g. e2e4, e7e8q). Type `resign` (or send EOF) to concede. The opponent is fully self-hosted (lc0 + local Maia weights); post-game analysis uses `ops chess evaluate`.
