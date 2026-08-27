---
id: cb8934e2-2f8f-5a23-a0d5-432d3e468fb4
slug: faucet-zero-is-unreadable
page-type-slug: finding
title: "Faucet zero is unreadable"
domain-slug: domain/chess
---

# Claim

Erin's chess faucet reads zero, and the zero cannot be read as "he is not practising". Contact with her is recorded and a coaching session evidently happened, yet all three earning signals stand at nought and no instrument parts a student who is not practising from practice that nothing recorded. Nothing is interrupted by it either: she carries no standing watch and no owed ping, and the faucet, the subscriber and the worker are healthy in every one of those worlds.

# Evidence

Measured 2026-08-07 while emptying `dirty/skills/chess/SKILL.md`, whose item 6
names the same gap — "zero is the true reading in three different worlds".

The reading. `ops persona level erin` returns level 1, greenDayTotal 0,
percentProgress 0, balance 0. Since `PUZZLE_POINTS` is 1 and `GAME_POINTS` 10 in
`packages/alanwalton/erin-chess-points/src/aggregate.ts`, a zero total means all
three counts are zero. Confirmed at the source: all 22 `chess-game` rows carry
`source = corpus`, which `countPlayedGames` excludes, so played games are zero;
`ops page list --type chess-review-session --count` returns 0.

Why the zero is not simply "no practice". `ops page list --type persona
--properties lastMessagedAt,title --search erin` returns
`2026-07-02T16:55:28.670Z` — a server stamp written by `ops persona
stamp-last-messaged`, the UserPromptSubmit hook recording Alan reaching out from
her terminal. And five `chess-progress` rows carry `createdAt` inside forty
seconds of one another at `2026-06-27T01:39:0*` with `lastReviewed 2026-06-26`,
which is a session leaving a trace. Both fall inside the faucet's lifetime and
neither moved it.

What would report it, and does not. `ops persona watch list erin` returns "no
standing watches"; `ops persona ping list erin` returns "no owed pings". The
subscriber re-aggregates from whole DB state on every event and on a 60 s
heartbeat, and `decideTotalPointsWrite` high-waters the total, so a correct zero
and a zero from a signal that never arrives are written identically and neither
raises anything.

Two standing findings each cover ONE path into this and neither covers the
reading. `chess/studied-path-has-no-producer.md` says the studied signal has no
producer. `chess/progress-rows-have-no-code.md` says no code reaches the
`chess-progress` rows. This is about the faucet's own silence: the number is
correct, and correct is what makes it unreadable.
