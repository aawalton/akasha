---
id: 3c5c75f0-b9c8-5920-ac32-e3923e20b09f
page-type-slug: old-ops-command
title: "Ops chess apply-move"
slug: ops-chess-apply-move
domain-parent-slug: domain/ops-chess
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/chess/apply-move.ts
path: chess apply-move
---

# Definition

- **Ops chess apply-move** — one legal move played onto a position, and the position and status it leaves.

# Help

Apply a UCI move to a position and report the resulting FEN plus terminal status (ongoing / check / checkmate / stalemate).

The move is validated against the engine's legal-move list first; an illegal move is rejected (exit 1).
