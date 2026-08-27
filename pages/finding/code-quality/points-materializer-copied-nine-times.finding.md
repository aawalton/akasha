---
id: f792dca0-8fd7-587c-a2d1-c5cfb2e4d4fc
page-type-slug: finding
title: "Points materializer copied nine times"
domain-slug: domain/code-quality
---

# Claim

Nine per-persona points-materializer packages under `packages/alanwalton/` carry the same worker shape, and the only record that an extraction was owed at the third or fourth is a head document being deleted. The note named its own trigger — "when a 3rd/4th rating-loop persona reuses this shape, extract a generic engagement-count engine instead of copying a fourth time" — and the count is now nine.

# Evidence

Measured in `~/code` on 2026-08-08.

`rg -l "decideTotalPointsWrite" packages/alanwalton/ --glob '!**/dist/**'`, with tests and the defining package `personas/core` filtered out, returns eighteen paths across nine per-persona packages: `ceri-points`, `elaine-points`, `eppie-song-points`, `erin-chess-points`, `fun-points`, `iris-tower-points`, `nimue-points`, `nova-words-read`, `zadi-points`. `aria-story-points` is a tenth of the family that writes its total exactly rather than by high-water, so it does not appear.

The shape is shared, not merely the primitive. In `eppie-song-points.worker.ts` the reconcile pass is `collectPages` → a pure count → `decideTotalPointsWrite` → `patchPageById` → `writePersonaDayPointsFromTotal`, composed through `runLongRunningWorker` as boot reconcile + hourly heartbeat + one page-event subscriber, and closing with a log of `levelForPoints(total, GREEN_BASELINE_DAYS, greenDayPoints)`. `ceri-points`, `zadi-points` and `aria-story-points` each carry that same closing line with their own noun substituted.

No generic engine exists: `rg -uuu -il "engagement-count engine|generic engagement"` over `~/code` exits 1. What WAS extracted is primitives — `decideTotalPointsWrite`, `levelForPoints` and `GREEN_BASELINE_DAYS` in `@alanwalton/personas-core`, `writePersonaDayPointsFromTotal` in `@alanwalton/daily-tracking`. What is copied nine times is the worker package around them.

The record that the extraction was owed was the quarantined head document `dirty/code/packages-alanwalton-eppie-song-points-claude.md`: "(Rule of Three: when a 3rd/4th rating-loop persona reuses this shape, extract a generic engagement-count engine instead of copying a fourth time.)" That document is removed by the instruction sweep, which is why this is filed here.

`pages/finding/code-quality/oauth-callback-tripled-with-no-home.finding.md` is the same class at a different site, its deferral likewise recorded only in a head document being deleted. This is a second instance at three times the count.
