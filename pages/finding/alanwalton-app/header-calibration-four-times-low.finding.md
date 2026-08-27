---
id: 31319cbe-c4f1-517c-aba7-2c7679c4ac3b
slug: header-calibration-four-times-low
page-type-slug: finding
title: "Header calibration four times low"
domain-slug: domain/alanwalton-app
---

# Claim

The Nimue points worker's module header states her calibration as `greenDayPoints = 1` and derives a whole level schedule from it — L2 at 7 sessions, L3 at 49, L4 at 229, L5 at 769. Her live persona row carries `greenDayPoints 4`, so every one of those figures is four times too low: the real thresholds are 28, 196, 916 and 3076 sessions. The same header was repaired in this very region four commits ago for a different staleness, and the number beside the repair was left alone.

# Evidence

Measured 2026-08-08 at `~/code` on `main`, while emptying `dirty/code/packages-alanwalton-nimue-points-claude.md`, whose head paragraph carried the same two numbers and was cut as false.

The header. `packages/alanwalton/nimue-points/src/nimue-points.worker.ts` lines 38-41: "Her per-page `greenDayPoints = 1` (page data set outside this worker) scales the shared green-baseline schedule: at one session/day, L2 at 7 sessions, L3 at 49, L4 at 229, L5 at 769 — the standard Knapp arc in literal days."

The row. `ops page show 019eef9c-c77d-7a21-8736-e6f01ebacff0 --properties greenDayPoints,totalPoints` returns `greenDayPoints 4`, `totalPoints 28`. The worker reads that field — `nimue.greenDayPoints ?? DEFAULT_GREEN_DAY_POINTS` — and passes it to `levelForPoints`, so 4 is the number in force.

The arithmetic. `packages/alanwalton/personas/core/src/ladder.ts` sets `GREEN_BASELINE_DAYS = [7, 42, 180, 540]`, cumulative 7/49/229/769, and `levelForPoints` compares `points >= cumulativeDays * greenDayPoints`. At gdp 4 the session thresholds are 28, 196, 916 and 3076. Her stored 28 puts her at exactly L2, where the header's schedule reads her as most of the way to L3.

Why it survived. `a1492f7df7` ("correct stale lieutenant-model headers on Aria/Ceri/Iris/Nimue point workers") rewrote this same paragraph three lines above and left the calibration sentence untouched. The repair and the defect are adjacent.

What made it hard to see is that the quarantined document and this header AGREED — both say gdp 1 and both print 7/49/229/769. Cross-checking one against the other returns corroboration, the outcome nobody investigates. Only the row disagreed, and no code search reaches it.

Not established: whether the other three workers in that commit carry the same stale calibration; I measured only Nimue. `pages/finding/alanwalton-app/eppie-header-denies-its-own-body.finding.md` is a neighbouring family — a header denying a write its body makes — which Nimue's header no longer does.
