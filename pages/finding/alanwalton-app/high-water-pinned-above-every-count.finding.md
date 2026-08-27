---
id: d9c813e3-efa5-53df-aa97-d5b832556585
slug: high-water-pinned-above-every-count
page-type-slug: finding
title: "High water pinned above every count"
domain-slug: domain/alanwalton-app
---

# Claim

Elaine's persona row stores `totalPoints` 16017.084 — a fraction, so provably a leftover value-wide smear rather than a session count — while at most two `review-session` rows exist estate-wide. `decideTotalPointsWrite` writes only when computed exceeds stored, so the `elaine-points` materializer's cumulative write can never fire again and her level reads 5, the top of the ladder, off the smear. Nothing reports it: the tick returns "noop", which is what a persona with nothing new to earn looks like.

# Evidence

Measured 2026-08-08 emptying `dirty/code/packages-alanwalton-elaine-points-claude.md`, whose central claim — `totalPoints` is "a pure function of durable state, idempotent and auditable" — this falsifies.

The row. `ops page show 019f04fb-947b-7686-8b7d-17141a85af4a --properties greenDayPoints,totalPoints` returns `greenDayPoints 1`, `totalPoints 16017.083999999995`.

Why the fraction settles it. `recompute-smeared-persona-totals.script.ts:3-12` records the P6 correction (#13576): `writeSessionPointsTotalForValue` smeared a value-wide session total across every persona sharing the value relation, and the script's own argument is that a true total "is an integer, so Awen's stored value is provably the smear". Elaine's was not corrected.

The population. `ops page list --type review-session --json` returns `"count":2,"truncated":false`, one of the two titled "Tech horizon-scan — 2026-06-26". Her computable count is at most 2.

The guard. `personas/core/src/totals.ts:24` is `return computed > stored ? computed : null`. With stored 16017.084 and computed at most 2, `elaine-points.worker.ts` takes the `write === null` branch on every tick, forever.

The reading. `GREEN_BASELINE_DAYS` is `[7, 42, 180, 540]` at `ladder.ts:118`, so at `greenDayPoints` 1 the cumulative thresholds are 7, 49, 229, 769. `levelForPoints` clears every one and returns the clamp, 5. Elaine reads as Bonding on at most two logged medicine rounds.

What hides it. The outcome label is `"corrected"` only when the write moved the total and `"noop"` otherwise, so a permanently blocked write emits what a settled persona emits. The second projection, `writePersonaDayPointsFromTotal`, keeps patching the per-day row and is unaffected, so the worker looks alive from every side.

Distinct from two standing findings I opened: `stale-prefix-hides-a-live-total.md` is a prefix shadowing a total, `two-bars-summed-into-one-level.md` is two `greenDayPoints` mirrors. Neither is a guard pinned above every achievable count.
