---
id: 5b8e71fc-4493-542f-8442-3d2dc839a17d
page-type-slug: finding
title: "Daily tier quotes a divisor the row lacks"
domain-slug: domain/code-quality
---

# Claim

`daily-tier.ts` quotes the live `<value>Level` formula "verbatim" with a `/ 10000` divisor the page-type row does not contain, and derives absolute thresholds (2,500 red … 20,000 blue) from it. Applied to a live `faithPoints`, the quoted formula inverts the reading: 107 gives black where the real formula gives blue.

# Evidence

Measured 2026-08-07 against `~/code` and the live page-type row, while emptying `dirty/skills/persona-craft/findings.md`, which recorded this on 2026-07-28. It reproduces.

The docstring, `packages/alanwalton/personas/core/src/daily-tier.ts:73-86`: "SOURCE OF TRUTH: the `faithLevel` and `learnLevel` formulas on the live `daily-tracking` page-type row… Both formulas are, verbatim, the unified normalized ladder (`points / 10000` against {0.25, 0.5, 1, 2}): `(faithPoints / 10000 >= 2) && 4 || (>= 1) && 3 || (>= 0.5) && 2 || (>= 0.25) && 1 || 0` i.e. >=2,500 red … >=20,000 blue". It adds per-value baselines: fun=100, health=1,200, love=3,600, wealth=28,800, faith and learn 10,000.

The row it names as authoritative, read as data rather than from a code mirror — `jsonb_array_elements(attributes->'propertyDefinitions')` on the `page-type` row where `id='faithLevel'`:

    (faithPoints >= 2) && 4 || (faithPoints >= 1) && 3 || (faithPoints >= 0.5) && 2 || (faithPoints >= 0.25) && 1 || 0

No divisor, no baseline: the fold was migrated onto the already-normalized `greenDayFraction`, so points are dimensionless green-day units compared directly.

It is worse than a stale note because it does everything a reader should want — names the authoritative source, says the row wins, quotes an expression precise enough to compute with. Someone who distrusts code mirrors and goes to that source still leaves with the wrong formula.

It inverts a live reading. A `faithPoints` of 107 over the stated 10,000 is 0.0107, below the 0.25 floor, and reads black; the live formula compares 107 against 2 and reads 4, blue.

The constant below is not wrong. `FAITH_LEARN_DAILY_LADDER` serves the abby and ali pending previews, where a raw-byte ladder against one persona's baseline is correct. Only its account of itself is wrong, which is why nothing red-flags it. A sibling defect in this docblock is filed at `code-quality/daily-tier-cites-a-nonexistent-name.md`, which quotes this header without reaching the formula.
