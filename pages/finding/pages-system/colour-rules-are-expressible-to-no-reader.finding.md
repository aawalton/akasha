---
id: 099c6d04-2b1e-5148-985a-32458e2a7a68
page-type-slug: finding
title: "Colour rules are expressible to no reader, including through values"
domain-slug: domain/pages-system
---

# Claim

165 authored `colorRules` across 29 property definitions reach no file-backed reader. The `values:` map form admits a `color` per option, but `labelled()` (`code:packages/shared/pages/access/src/file-property-defs.ts:85-91`) extracts only `label` and drops `color`, so even a property document stating colours would render none. Writing one is the green-over-empty trap rather than a repair. Recorded here so whoever re-decides presentation starts from what was chosen.

# Evidence

Measured 2026-08-20 over `DATABASE_ADHOC_URL`. 29 definitions, 165 rules, splitting 16 selects / 100 rules, 7 formulas / 35, 6 numbers / 30. All 100 select rules are pure `value == "X"` equality; the 65 numeric rules are `>=` ladders.

Grade scale, 16 rules each on `collection-template.rating` and `story-chapter.rating`: F default; S+, S, S- red; A+, A, A- green; B+, B, B- blue; C+, C, C- yellow; D+, D, D- orange.

Status, 7 rules each on `collection-template.status`, `story-chapter.status`, `topic.status`. Rank, 6 each on `collection-template.rank` and `story-chapter.rank`: S-Rank red, A-Rank green, B-Rank blue, C-Rank yellow, D-Rank orange, Not Ranked default. Maturity, 3 each on both `maturityRating`: PG green, PG-13 yellow, R red. Also `value.color` 6, `topic.sensitivity` 5, `error.status` 4, `temper-task.priority` 4, `temper-task.scope` 4, `temper-completed-task.scope` 4, `idle-persona-card.lockState` 2.

The 13 `daily-tracking` ladders carry 5 rules apiece over the six life areas — faith, fun, health, learn, love, wealth — as both `<area>Points` and `<area>Level`, plus `totalLevel`.

Two consumers survive the rows and one does not. `code:packages/alanwalton/web/app/idle/lib/idle-card-page-type.ts:111,190` holds a compiled-in copy, so idle cards keep their colours. `code:packages/infra/checks/src/checks/check-color-rule-variants.ts` reads `property-definition` rows over `SUPABASE_URL`; with no rows its population is zero and it reports over nothing.
