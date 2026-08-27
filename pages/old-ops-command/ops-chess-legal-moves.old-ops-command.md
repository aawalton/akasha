---
id: f66fbe7d-4f2a-50af-8fd5-996026ddb303
page-type-slug: old-ops-command
title: "Ops chess legal-moves"
slug: ops-chess-legal-moves
domain-parent-slug: domain/ops-chess
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/chess/legal-moves.ts
path: chess legal-moves
---

# Definition

- **Ops chess legal-moves** — every move legal in one position, listed by the engine.

# Help

List every legal move in a position, validated by the self-hosted Stockfish engine (via `go perft 1`).

Default stdout: one UCI move per line (e.g. e2e4), sorted. An empty list means the position is terminal (checkmate or stalemate).
