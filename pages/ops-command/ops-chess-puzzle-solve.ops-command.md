---
id: c1e40ea6-424e-5269-b24c-6128549371ad
page-type-slug: ops-command
title: "Ops chess-puzzle solve"
slug: ops-chess-puzzle-solve
domain-parent-slug: domain/ops-chess-puzzle
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/chess-puzzle/solve.ts
path: chess-puzzle solve
---

# Definition

- **Ops chess-puzzle solve** — one stored puzzle marked solved

# Help

Record a solved puzzle: flip the `solved` marker on the `chess-puzzle` page with the given Lichess puzzle id. This is the practice-record write behind Erin's chess points source — the `erin-chess-points` worker counts solved puzzles (1 pt each) through the `chess-puzzles-solved` page query. Idempotent: re-solving an already-solved puzzle is a no-op.
