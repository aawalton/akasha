---
id: 3c6f19f4-a5c7-5b42-ac11-9e1093bbbd39
slug: value-points-keys-written-and-never-shown
page-type-slug: finding
title: "Three value-points keys are written and never shown, and disagree with the aggregate that overrides them"
domain-slug: domain/persona-points
---

# Claim

Three of the six value-points keys on `daily-tracking` are written as raw attributes that nothing has ever displayed, because the page view recomputes an aggregate of the same name and overrides them — and where both stand, the two numbers disagree.

# Evidence

Measured 2026-08-20 against the live database, over the 90 `daily-tracking` rows and the 1,933 live `relationship-progress` rows, while working #19434.

`daily-tracking` declares `faithPoints`, `lovePoints`, `healthPoints`, `learnPoints`, `funPoints` and `wealthPoints` as `aggregate`, each summing `greenDayFraction` over the `relationshipProgress` relation filtered to one value, at four decimals.

**Three carry a stored attribute as well.** `faithPoints` stands on 81 rows and `learnPoints` on 55, every one a number. `funPoints` stands on 13, every one a JSON `null`. `healthPoints`, `lovePoints` and `wealthPoints` stand on none.

**Where both stand they disagree, and not by rounding.** 30 of the 81 faith days and 18 of the 55 learn days differ from what the aggregate computes for the same day. The aggregate can compute a faith figure on only 68 days, against 81 days carrying a stored one, so faith is written on days where no persona under faith has a row at all.

**The aggregate is what is shown.** `use-page-default-content.ts` calls `computeAggregatesForPage`, which recomputes every aggregate definition unconditionally, and spreads the result after the stored properties — so the computed value wins on every key, every day. `computeFillAggregatesForPage`, the variant that leaves a stored value standing, has no caller outside its own test. So the stored numbers have never reached Alan.

**They are still written on every run.** `run-commit-points.ts` writes faith from a commit window and learn from net bytes under a books prefix, through `writeDailyPointField`. Neither is the quantity the aggregate names, which is what the personas under that value earned. Two different measurements share one key.

Nobody has established which side is right, and the question has not been put to Alan.

Not measured: whether anything outside these two repositories reads the stored keys; what writes `funPoints` as null, or what a null there is meant to mean.
