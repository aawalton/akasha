---
id: 5d4db7df-7fb3-59a1-adcc-6b0499ce1cf1
slug: studied-path-has-no-producer
page-type-slug: finding
title: "Studied path has no producer"
domain-slug: domain/chess
---

# Claim

The `chess-review-session` signal is complete at every surface except the one that would emit it. The page type is defined, the worker ensures it at boot, the points aggregate counts a row at the same weight as a played game, and a dedicated live event subscriber watches for one — and nothing in the estate can create such a row. No `ops` verb writes one and no code path outside those four surfaces mentions the type, so the studied path earns nothing and every surface it passes through reports ready.

# Evidence

Measured 2026-08-07 while emptying `dirty/docs/erin-coaching-mechanics.md`,
which describes recording a `chess-review-session` as a rail still to build.

`grep -rn "chess-review-session\|chessReviewSession" --include=*.ts packages/`
in the code repository, tests excluded, returns eighteen lines, all inside
`packages/alanwalton/erin-chess-points/src/` and all of four kinds:

- `chess-review-session-page-type.ts` — the page-type spec, the slug constant,
  and an idempotent get-or-create for the type and its properties.
- `aggregate.ts` — counts each distinct row and "credits the SAME weight as a
  played game"; the field is `Studied active-review sessions`.
- `subscriber.ts` — resolves the page-type id for a subscription filter and
  registers `manifestFor("erin-chess-points-reviews", ...)`.
- `erin-chess-points.worker.ts` — ensures the type at boot and wires that
  subscriber alongside the `chess-game` and `chess-puzzle` ones.

Nothing creates a row. `ops --help` lists no verb that does: `chess-game` has
`seed-page-types`, `ingest`, `list`, `show`; `chess` has `legal-moves`,
`evaluate`, `apply-move`, `play`, `play-game`; `chess-puzzle` has `sync`,
`query`, `solve`.

The two sibling signals feeding the same worker are the positive control, and
both have a producer. `ops chess-puzzle solve` is "Record a solved puzzle (flip
`solved`) — the practice-record behind Erin's faucet", its help adding "the
`erin-chess-points` worker counts solved rows (1 pt each)". `ops chess
play-game` is "Play a full game vs Maia (human-like) and persist it as a
reviewable chess-game row", with `ops chess-game ingest` beside it.

`dirty/skills/chess/findings.md` records the same observation with two readings
taken at the time — the subscriber has processed 0 rows and the row count is 0.
That document is under quarantine and queued for removal.
