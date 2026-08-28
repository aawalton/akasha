---
page-type-slug: finding
slug: points-unsupported-by-entries
title: "A day's points value can stand unsupported by the entries beneath it"
domain-slug: domain/alan-harness-tracking-score
---

# Claim

A day's points value is a stored snapshot rather than a reading of the entries beneath it, and it can stand against a set of entries that does not support it with nothing saying so. On 2026-08-27 the daily-tracking page carried `nutrition-points: 0` while three `food-entry` pages inside that day's wake window each carried `plant-grams: 40`, so the entries standing beneath the value supported 120 and the value read 0. The same field on the same page read 1800 at a moment when the entries beneath it supported at most 120.

The value is recomputed rather than accumulated: `rollupNutritionForDay` reads `loadDayPlantGrams(dayStr)` and writes what it returns. But it is recomputed only when something calls it, which `ops food log` does and no other route to changing the entries does. Between calls the stored number is whatever the last call left, and neither the field nor the page records when it was computed or what it was computed against.

A points total that does not fall when its inputs are taken away cannot be relied on to have risen when they were added. Reading the value does not distinguish a current one from a stale one, and points are what Alan reads.

# Evidence

Observed on 2026-08-27.

Standing entries: three `food-entry` pages dated 2026-08-27 carry `happened-at` of 19:41:46, 19:42:01 and 19:43:38 UTC and `plant-grams: 40` each. `wakeDayWindow(resolveRoots(), "2026-08-27")` returns 2026-08-27T12:30:00Z to 2026-08-28T10:00:00Z, and all three instants fall inside it, so the query the roll-up runs would count them. The daily-tracking page for that day read `nutrition-points: 0` both before and after the period observed.

Mechanism read rather than inferred: `rollupNutritionForDay` at `tools/lib/daily-tracking/nutrition-points.ts:4-10` calls `loadDayPlantGrams(dayStr)` and passes the result to `writeNutritionPoints`, so the stored field is a recomputation and not a running total. `loadDayPlantGrams` at `tools/lib/daily-tracking/nutrition-grams.ts:15-24` sums `plant-grams` across rows returned by `askComposed` — a query over rows rather than a walk of the page files.

How it surfaced, which is not its cause: fixture entries written by a test run drove `nutrition-points` to 1800, and it did not fall when those 42 pages were removed. The value already stood at 0 against 120 grams of standing entries before those runs began, so the divergence predates them.

Limits. Two mechanisms produce this same observation and this agent could not separate them: the roll-up may never have re-run since the entries changed, or it may re-run and read rows that no longer match the files. The page query service is at an in-cluster address unreachable from this seat — `http://page-query-service.page-query-service.svc.cluster.local:8787/q` gave no answer within 5000ms — so the rows behind the query were not observed at all.

Not measured: whether a later legitimate roll-up corrects the drift or carries it forward, which is what decides whether this is a transient smear or a standing error. Whether the other points fields on the page are computed the same way. Whether any consumer of these values reads them as current.
