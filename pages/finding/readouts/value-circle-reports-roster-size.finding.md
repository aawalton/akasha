---
id: 790f0c65-b953-5140-9e3a-2c305092a28c
page-type-slug: finding
title: "Value circle reports roster size"
domain-slug: domain/global
---

# Claim

A value's daily stoplight tiers a sum of its personas' raw green-day units against a fixed ladder, while the number of personas summed ranges from two to thirteen. Wealth's thirteen reach green on a total of 1.0 — an average of 0.077 each — where Love's two need 0.5 each, so the circle reports roster size as much as it reports the day, and drifts further each time a persona is added. The units are uncapped too, so one persona's large day can carry a whole value alone.

# Evidence

Measured 2026-08-07 while emptying `dirty/skills/persona-craft/economy-structural.md`, which proposes a rework for this, declares itself unbuilt, and is queued for removal. I confirmed the rework is still unbuilt rather than taking its word: no colour-weight quantization exists anywhere in `packages/`.

The fold. `packages/shared/status-bar-access/src/daily-stoplights.ts` renders six circles, `VALUES_ORDER = ["faith", "love", "health", "learn", "fun", "wealth"]`. `aggregateValueUnits` sums each persona's raw `greenDayUnits` into her value with `sums.set(persona.valueSlug, prior + persona.greenDayUnits)`, and `resolveValueStoplightTiers` tiers that sum with `evalDailyTier(sum, GREEN_DAY_UNITS_LADDER)`. Line 95 names the design: "Each persona's `greenDayUnits` adds into her value's — the breadth mechanic."

The ladder is fixed, at `daily-stoplights.ts:57`: `{0.25 red, 0.5 yellow, 1 green, 2 blue}`. The same four thresholds apply whatever the roster size.

The roster is not fixed. `ops persona roster` gives Faith 4, Fun 9, Health 6, Learn 6, Love 2, Wealth 13. So green costs Wealth an average of 1/13 = 0.077 green-days per persona and Love an average of 1/2 = 0.5 — a 6.5x difference in what the same colour demands, arising from headcount alone.

Uncapped, second half. `greenDayUnits` is `points / greenDayPoints` with no ceiling (`personas/core/src/ladder.ts`) and the fold adds raw units, so one persona's 20x day carries her whole value to blue alone.

Nothing reports either; the circle renders identically whichever is happening. The two existing stoplight findings here are about different failures — one about two surfaces running different ladder versions, one about a superseded duplicate formula. Duplicate check run as its own call.

Not established: what the right shape is. The quarantined document proposes summing capped colour weights against a bar of 2; that is a proposal Alan settled and nobody built, and whether it is still wanted is his call.
