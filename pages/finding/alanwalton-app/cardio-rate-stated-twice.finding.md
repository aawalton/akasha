---
id: 0a5de9d5-69bd-5da9-ab6a-6f001f24e207
page-type-slug: finding
title: "Cardio rate stated twice"
domain-slug: domain/alanwalton-app
---

# Claim

The cardio points formula is stated at two rates 70 times apart across live code: the
`ops tracking cardio-set` help says `cardioPoints = activeCalories * 70`, and six
other sites in the same packages say `cardioPoints = activeCalories`.

# Evidence

Saying `activeCalories * 70`:

- `packages/alanwalton/daily-tracking-cli/src/cardio-set.ts:13` — "Cardio HP is the
  formula `cardioPoints = activeCalories * 70`, computed on read". This is the text
  `ops tracking cardio-set --help` prints, so it is the rate a reader meets before
  logging a number.
- `packages/alanwalton/daily-tracking/scripts/src/backfill-active-calories.script.ts:6-9`
  describes the migration that produced it: "Before this change `cardioPoints` was a
  stored number at rate 1 HP/cal... After the flip, `cardioPoints` is a formula
  (`activeCalories * 70`)".

Saying `activeCalories`, at 1 HP/cal:

- `packages/alanwalton/web/app/tracking/lib/active-energy-write.ts:50`
- `packages/alanwalton/daily-tracking/src/write-daily-points.ts:18` and `:96`
- `packages/alanwalton/daily-tracking/src/health-total-points.ts:21-22`
- `packages/alanwalton/daily-tracking/src/persona-day-points.ts:62`
- `packages/alanwalton/daily-tracking-cli/src/cardio-ingest.ts:16`, which is the
  sibling ingest verb's help — so the two cardio verbs print different rates to the
  same reader.
- `packages/alanwalton/daily-tracking/src/health-total-points.unit.test.ts:11` names
  the 1 HP/cal version "The production cardio formula def" and builds a fixture on it.

Which rate the store computes is not established here: nothing was run against the
database, and the formula lives on a property definition rather than in these files.
What is established is that a reader cannot learn the rate from the code, because it
answers twice, 70 apart — and one answer is what the CLI tells Alan when he asks how
to log cardio. The two disagreeing help texts are sibling verbs in one CLI package.

Found while ingesting `dirty/docs/logging-hub.md`, checking that document's claim that
"`cardioPoints` is a read-formula off raw `activeCalories`" — a claim that matches six
sites and contradicts the help text of the very verb it tells the reader to run.
