---
id: 842f876f-c848-543d-9116-45661e07fc0f
page-type-slug: old-ops-command
title: "Ops chess-puzzle query"
slug: ops-chess-puzzle-query
domain-parent-slug: domain/ops-chess-puzzle
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/chess-puzzle/query.ts
path: chess-puzzle query
---

# Definition

- **Ops chess-puzzle query** — the stored puzzles carrying a motif and inside a rating band, easiest first

# Help

Query ingested `chess-puzzle` pages by motif AND difficulty — the graded drill path. Filters by theme membership (e.g. fork, mateIn2) and a rating band, returning concrete positions (FEN), solutions (UCI moves), and the solver's color, sorted easiest-first.
