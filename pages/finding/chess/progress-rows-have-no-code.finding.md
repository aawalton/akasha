---
id: 9ac3bd69-b2d6-555c-bbb7-0d76156afda0
page-type-slug: finding
title: "Progress rows have no code"
domain-slug: domain/chess
---

# Claim

The `chess-progress` page-type carries five rows of Alan's chess diagnosis and no code in either repository defines it, ensures it, writes it or reads it. The five surfaces its siblings have — a page-type spec, an idempotent ensure at worker boot, a producer verb, a counter and a subscriber — it has none of. The rows are reachable only through the generic `ops page` verbs, so the durable record of where his game stands is an orphaned data island that no chess surface can see.

# Evidence

Measured 2026-08-07 while emptying `dirty/skills/chess/SKILL.md`, whose item 8
describes the same rows as "the durable progress record landed and is not the
record".

`ops page list --type chess-progress --count` returns 5. With
`--properties title,createdAt,lastReviewed,category,activeDrill` the five are
"Overall: where his game stands", "Fork (tactical motif)", "Opening
understanding", "Endgame technique" and "Thread: gentlest diagnosis next
session" — categories `overall`, `motif`, `opening`, `endgame`, `thread`. Every
`createdAt` is `2026-06-27T01:39:0*`, inside forty seconds of one another, and
every `lastReviewed` is `2026-06-26`: one session, six weeks ago, never touched
since.

`rg -n --multiline "chess-progress|chessProgress|chess_progress"` over the whole
code repository returns exactly one line, and it is a comment about a different
page-type:
`packages/alanwalton/erin-chess-points/src/chess-review-session-page-type.ts:9`,
naming "the durable-mastery (`chess-progress`) signal" while explaining what
`chess-review-session` is kept separate from. The same search over the
instructions repository excluding `dirty/` returns nothing.

`ops --help` lists twelve chess verbs and none reaches it: `chess` has
`legal-moves`, `evaluate`, `apply-move`, `play`, `play-game`; `chess-game` has
`seed-page-types`, `ingest`, `list`, `show`; `chess-puzzle` has `sync`, `query`,
`solve`.

The contrast with its two siblings is the point. `chess-game` and `chess-puzzle`
each carry a page-type module, a seeding or sync verb, a producer and a
subscriber in `packages/alanwalton/erin-chess-points/src/subscriber.ts`.
`chess-review-session` carries four of those five and lacks only the producer,
which is the standing finding `chess/studied-path-has-no-producer.md`. This one
carries none of them and yet is the only one of the four holding rows about
Alan himself.
