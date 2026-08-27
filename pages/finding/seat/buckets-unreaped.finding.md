---
id: 064afb3b-c881-5b1d-ae3a-8885276040bd
page-type-slug: finding
title: "Nothing removes a seat bucket, so the store holds 4,674 files for 9 live seats and grows daily"
domain-slug: page-type/seat
---

# Claim

Nothing removes a seat bucket, so the store holds 4674 files for 9 live seats and grows by roughly 390 a day.

# Evidence

Counted on 2026-08-18 from `~/.instruction-seats/`: 4674 bucket files, of which 9 name an agent with a
process in `/proc`. `ops seat list --status running,paused,active` returns the same 9 rows, and
`ops seat list --status dormant` returns none, so the other 4665 buckets stand behind no agent at all.

Every one of the 4674 was written within the last 12 days — the oldest mtime is 12.0 days and 1311 fall
inside the last 7 — so the store is not an old pile that stopped growing. It is filling at about 390
buckets a day and nothing has ever taken one out.

`agentsWithAttributes()` in `tools/lib/seats-dir.ts` reads the whole directory, and `seatHoldingsNow()`
in `tools/lib/seat-work.ts` calls `seatTurnStateOf` on every name it returns, so `ops instructions
project-tree` opens each of the 4674 buckets to fold the work of 9 seats.

`page-types/seat.md` intends that a stopped seat has no page. Until 2026-08-18 no hook stamped a seat
stopped, so nothing could tell a bucket whose session ended from one whose agent is between turns.
A sweep keyed on absence from `/proc` alone would be wrong for a dormant seat, whose process is torn
down on purpose and which `ops seat alive` reports as `dormant` rather than `dead`; there are none
today, so the hazard is latent rather than live.
