---
id: 4485a742-b122-5ba6-9384-535567733e91
slug: play-move-choice-varies-per-run
page-type-slug: finding
title: "Play move choice varies per run"
domain-slug: domain/ops-cli
---

# Claim

`ops chess play` returns a different move on repeated identical invocations, so its success path cannot be proved by diffing stdout against an earlier capture.

# Evidence

Three consecutive runs of `ops chess play "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" --level 3 --movetime 200 --json` returned `g1f3`, then `e2e3`, then `e2e4`. The search is budgeted in wall-clock milliseconds, so how deep it gets varies with load rather than with the invocation.

Re-run on 2026-08-27 against the body at `tools/commands/chess/play.ts`, the same three invocations returned `e2e3`, then `e2e3`, then `e2e4`.

A position holding exactly one legal move pins the answer at every strength: `7k/8/7Q/8/8/8/8/K7 b - - 0 1` admits only `h8g8`, and returned it at `--level 1`, `--level 20` and `--elo 3000`. That is what let the body's four printed lines be compared byte-for-byte when the verb moved into akasha.

`ops chess evaluate` does not share the problem: it is budgeted by `--depth`, and two runs at `--depth 8` returned identical JSON.
