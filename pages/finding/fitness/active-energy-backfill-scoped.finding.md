---
id: f42f983f-9e13-528a-a735-8945148a60e4
slug: active-energy-backfill-scoped
page-type-slug: finding
title: "Active energy backfill scoped"
domain-slug: domain/fitness
---

# Claim

Alan decided on 2026-07-25 to backfill all 23 days of missing Active Energy data, and the fitness backfill is buildable and landable now even though execution is blocked until the device-secret cutover, because only `/api/tracking/active-energy` (gated by `active-energy-write.ts:40`, which refuses when `resolvedUserId !== ownerUserId`) can accept the write and only Alan's device with his own minted secret can call it.

# Evidence

From project #16014 (domain `fitness`, status `someday_maybe`, captured 2026-07-25, never given an objective).

Alan's decision, 2026-07-25 09:34Z: "Backfill all 23 days." The date-range capability was in scope.

Why this is a build: `SyncActiveEnergyIntent` reads only yesterday's Active Energy and posts it. Backfilling 2026-07-02 to the capture date needs the Intent, or a sibling path, to query a date range from HealthKit and write one row per day. Apple Health retains the source samples on-device; the read path does not exist yet.

Hard constraints recorded: (1) the write seam is `/api/tracking/active-energy` only, gated by `active-energy-write.ts:40` refusing when `resolvedUserId !== ownerUserId`, so only Alan's device with his own minted secret can execute the backfill. The code can be built and landed now; only execution waits on the cutover. (2) Idempotence is load-bearing and the main risk: downstream `cardioPoints = activeCalories`, so writing a day twice, or overlapping the daily sync's window, double-counts it, and a wrong value is worse than a missing one. Writing the same day twice must be provably a no-op or an overwrite, never an accumulate. (3) Bounded range, explicit: 23 days is small; take a start/end date and refuse a range beyond a stated maximum rather than building an unbounded sync.

Two-sided acceptance specified, not observed: a gap day with known non-zero Active Energy lands its value on that day's `relationship-progress` row; re-running the same day does not change the stored value (the side that matters); a day with no samples writes nothing or an explicit zero, decided, never rendering an absent value as a measured zero.

Sequencing: behind the cutover for execution only. Build order: read the write path for accumulate-vs-overwrite, add the date-range read, land, then execute after the Keychain round-trip and Health permission grant (per #15934). The staleness alert on #16007 should land first, so the backfill's effect is observable.
