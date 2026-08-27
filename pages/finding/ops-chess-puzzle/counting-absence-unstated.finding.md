---
id: cd6cd0c0-56e7-5204-b422-f204d5f155a0
slug: counting-absence-unstated
page-type-slug: finding
title: "Nothing states that no chess-puzzle command counts a solved puzzle"
domain-slug: domain/ops-chess-puzzle
---

# Claim

Nothing states that no `ops chess-puzzle` command counts a solved puzzle. That absence stood on the namespace until 2026-08-19 and was cut as already bound, but what binds it is a positive claim on `domains/chess-puzzle.md` — that a puzzle marked solved is what Erin's chess points worker counts, one point each. That names where counting happens without saying a fourth command here would be wrong.

# Evidence

The reviewer of `domains/ops-chess-puzzle.md` cut this line on 2026-08-19 in commit `8b0e13e` and named it the weakest of its three cuts. `ops chess-puzzle --help` names three commands and none counts.

Measured: that the three commands do not count, and that `chess-puzzle.md` reaches the same reader through `chess.md`'s `glossary-slugs:`. Not measured: whether a reader holding only the positive claim would infer the absence — which is the question the cut turns on.
