---
id: be050230-9530-5094-9402-9dbc2f301f1f
page-type-slug: old-ops-command
title: "Ops chess-puzzle sync"
slug: ops-chess-puzzle-sync
domain-parent-slug: domain/ops-chess-puzzle
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/chess-puzzle/sync.ts
path: chess-puzzle sync
---

# Definition

- **Ops chess-puzzle sync** — Lichess's open puzzle database read in and landed as a puzzle set's puzzles

# Help

Ingest the open Lichess puzzle database (CC0) into a `chess-puzzle-set` page's `puzzles` rows. Streams the (zstd-compressed) CSV, parses each row at the boundary, and lands batches keyed on `puzzleId`, so a re-run updates the row already standing rather than adding a second. `solved` is left as it stands. Defaults to streaming from https://database.lichess.org/lichess_db_puzzle.csv.zst; pass --file for a local download. Capped at 10000 rows unless --limit / --all is given.
