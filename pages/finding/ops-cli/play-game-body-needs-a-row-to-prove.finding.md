---
id: ddfbc540-34eb-59d2-a0ed-7dd03b1d2458
slug: play-game-body-needs-a-row-to-prove
page-type-slug: finding
title: "Play game body needs a row to prove"
domain-slug: domain/ops-cli
---

# Claim

`ops chess play-game` reaches none of its own printed output without landing a chess-game page, so proving its body by diffing costs a committed page in the corpus that is reviewed — `pages/chess-game/`, which holds 48 of them.

# Evidence

Every way the game can end — `resign` on stdin, EOF on stdin, and a start position that is already checkmate — falls through the same tail of the body into the `writePage` call at `tools/commands/chess/play-game.ts:184`, which lands and commits a page named from an `externalId` the game derives (`chessGamePageName`, `alanwalton/chess/src/lib/persist-game.ts:7`). Nothing in the verb's declared surface suppresses the write: the flags it declares at `tools/commands/chess/play-game.ts:29-52` are `--fen`, `--color`, `--elo` and `--json`, and none of them is a dry run.

The two paths that return before it are `--help` and the FEN refusal at `tools/commands/chess/play-game.ts:107`, and those are what the move of the `chess` namespace into akasha exercised. Its stdin loop, its Maia call and its `runGame` callback wiring were moved on the reading alone and remain unexercised.

`lc0` and `stockfish` are both on PATH on this workstation, at `/home/linuxbrew/.linuxbrew/bin`, so the verb is runnable here; what stopped the run was the landed page, not the engine.
