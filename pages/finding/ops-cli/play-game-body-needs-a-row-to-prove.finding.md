---
id: ddfbc540-34eb-59d2-a0ed-7dd03b1d2458
slug: play-game-body-needs-a-row-to-prove
page-type-slug: finding
title: "Play game body needs a row to prove"
domain-slug: domain/ops-cli
---

# Claim

`ops chess play-game` reaches none of its own printed output without inserting a chess-game row, so proving its body by diffing costs a row in the corpus that is reviewed.

# Evidence

Every way the game can end — `resign` on stdin, EOF on stdin, and a start position that is already checkmate — falls through the same tail of the body into `persistChessGame`, which inserts keyed on an `externalId` the game derives. Nothing in the verb's declared surface suppresses the write.

The two paths that return before it are `--help` and the FEN refusal, and those are what the move of the `chess` namespace to the instructions repo exercised. Its stdin loop, its Maia call and its `runGame` callback wiring were moved on the reading alone and remain unexercised.

`lc0` and `stockfish` are both on PATH on this workstation, so the verb is runnable here; what stopped the run was the row, not the engine.
