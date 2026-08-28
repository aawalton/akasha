---
id: 019f06d4-e0ee-750d-8226-18a85d22aee1
page-type-slug: page-type
title: "Chess puzzle"
extends-slug: page
files: none
body-shape-slug: empty
slug: chess-puzzle
plural-slug: chess-puzzles
domain-parent-slug: domain/chess
---

# Definition

- **Chess puzzle** — one position from Lichess's open database, with the line that solves it.

# Design

Every puzzle comes from Lichess's open database; nothing here composes one.

A puzzle is keyed on its Lichess id, so the same puzzle read twice is one puzzle.

A puzzle marked solved is what Erin's chess points worker counts, one point each.

A puzzle stands in its set's puzzles rather than in a file of its own.
