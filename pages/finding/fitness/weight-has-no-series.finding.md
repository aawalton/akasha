---
id: 0010afbc-458d-5d14-a5df-f1f8fa2bc80d
page-type-slug: finding
title: "Weight has no series"
domain-slug: domain/fitness
---

# Claim

Weight is half of the fitness domain's own stated subject and has no instrument: `bodyweight` is a single scalar on the singleton client profile, overwritten in place, so no series exists and no trend or slip can be read.

# Evidence

Measured 2026-08-07, while ingesting a quarantined document that reported it against the persona row. I re-ran every claim.

Aelwyn's one-line purpose, verbatim from `ops persona roster` today: *"Fitness coach — training and weight, planned and actually kept."* Both halves are named as her subject.

Training is instrumented throughout. `ops exercise digest --focus pull` returns per-movement last-set and best-set reads with dates, a progression target, equipment, mobility metrics and a last-session volume; `packages/collections/exercises/src/selection/policy.ts:57` carries ranked goal weights (`longevity: 40, energy: 30, functionality: 20, aesthetics: 10`); sets are logged individually and rolled into session volume by `packages/collections/exercises/src/tracking/day-volume.ts`.

Weight is one number. `digest.ts:303-306` reads it as `select: ["id", "bodyweight"]` off `profiles.rows[0]`, defaulting to `null`; `day-volume.ts:78-83` does the same, and `digest-model.ts:83` types it `readonly bodyweight: number | null`. Every one of those is a read of the current value on the singleton `client-profile` row. Today's digest prints `bodyweight  180`.

Nothing writes a history. `rg -in "bodyweight.?log|weight.?series|weighIn|weigh-in|bodyweightEntry"` across `~/code` outside `dist` returns no match — there is no weigh-in page type, no dated row, and no second copy of a prior value. A new figure replaces the old one, and the old one is not recoverable from the domain's own data.

What follows is arithmetic rather than judgment: with one overwritten scalar there is no series, so no trend can be computed, no slip can be detected, and the second half of the domain's own one-line description has nothing it could be measured against.

Not established, and deliberately not argued here: whether weight should be instrumented at all. The quarantined source recorded that Alan has not been asked, and I found nothing showing he has since — no project in `~/memory/projects/` names bodyweight tracking.
