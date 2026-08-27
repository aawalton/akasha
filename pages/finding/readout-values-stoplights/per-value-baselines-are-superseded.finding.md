---
id: 9bc8dd09-c4dd-557e-a6c0-579539197d50
slug: per-value-baselines-are-superseded
page-type-slug: finding
title: "Per value baselines are superseded"
domain-slug: domain/global
---

# Claim

This readout's Design says every value runs one multiplier ladder differing only in its own one-times baseline, and that the ladder lives on the page-type row with the code mirroring it. Alan ruled on 2026-08-11 that per-value baselines are superseded: a value now reads from the personas serving it. The per-value formulas still stand on the live row, so the superseded mechanism is what a reader finds and takes for current.

# Evidence

Verified in `~/code` on 2026-08-11, with Alan correcting the premise.

**What runs.** `packages/shared/status-bar-access/src/daily-stoplights.ts:143` takes personas, not points: `resolveValueStoplightTiers(personas: readonly PersonaDayUnits[])`. It calls `aggregateValueUnits(personas)` and draws each value's total against `GREEN_DAY_UNITS_LADDER` (0.25 / 0.5 / 1 / 2). No per-value baseline appears anywhere in that path. Each persona's own green-day bar does the normalizing, and hers is already declared in her domain document — which is what `ops persona faucet check` reconciles.

**What still stands and should not.** `packages/alanwalton/personas/core/src/daily-tier.ts:89` names the `faithLevel` and `learnLevel` formulas on the live `daily-tracking` page-type row as SOURCE OF TRUTH, and enumerates per-value baselines in prose: fun 100, health 1,200, love 3,600, wealth 28,800, faith and learn 10,000. The row carries a `type: "formula"` property per value, each dividing that value's points by its baseline. Alan says these are superseded and the numbers should be removed.

**Why it was undetectable.** Both mechanisms read as live. The row's formulas conform, evaluate and render; the comment asserting the row is authoritative is not wrong about the row, only about which reading it feeds. Nothing reports a formula that stopped being consulted, so the stale one is the one a reader trusts.

**Open and carried.** Alan described the new reading as the AVERAGE of the persona stoplights aligned with a value. What runs is a SUM of their green-day units. The two differ materially — three personas at a third of their bars make green under a sum and red under a mean — and he has not yet ruled between them. Until he does, the corrected Design line cannot be written.
