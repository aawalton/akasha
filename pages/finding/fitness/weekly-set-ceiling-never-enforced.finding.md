---
id: 99dbdfd0-01d0-5eea-86da-f7e978b74789
page-type-slug: finding
title: "Weekly set ceiling never enforced"
domain-slug: domain/fitness
---

# Claim

`weeklySetCeiling` (and `weeklySetFloor`) on the fitness `SelectionPolicy` singleton is declared, defaulted, persisted, surfaced by `policy-show`, and asserted by a unit test, but the selector never reads it — no weekly-set cap has ever been enforced on a session, and clearing the row's value would change nothing.

# Evidence

From project #16694 (status `someday_maybe`, `live-on: deploy`, domain `fitness`), captured and never defined.

Alan's ruling, verbatim, 2026-07-27: "That weekly set ceiling should be removed, that's wrong." Captured by athena during the `fitness` domain-vision draft (#16580 / #16471), at Alan's direction: "you can capture that for aelwyn and let her pick it up later." Capture only, not settled intent — the define-front is aelwyn's to run.

What is there now: `weeklySetCeiling: 12` sits on the `SelectionPolicy` singleton (`019ee0d8-31d8-7d04-bf62-2b7d0ccd7ec1`) and in `DEFAULT_SELECTION_POLICY`, described in the type as "Hard-set ceiling per muscle per week."

A repo-wide search for `weeklySetCeiling` returns four sites, none a consumer: `packages/collections/exercises/src/page-types/seed-tracking.ts:317` (property definition), `packages/collections/exercises/src/selection/policy.ts:34,61,83,157,176` (type field, default, projection, field-name list, row-parse), `packages/collections/exercises/src/selection/policy.unit.test.ts:26` (asserts default is 12). The selector never consults it; `fieldNum(row, "weeklySetCeiling") ?? d.weeklySetCeiling` falls back to the code default, so clearing the row changes nothing — removal has to be in code.

`weeklySetFloor` is in exactly the same position (declared, defaulted, parsed, tested, read by nothing). Alan ruled only on the ceiling; the floor is an adjacent observation for aelwyn's exploration step, not scope.

A fixed weekly cap conflicts with aelwyn's design ruling that a pre-approved plan is wrong; her dose bound is the dual STOP applied per-session from observation.

Other selection-policy knobs are unaudited for the same defect: `noveltyCapPerSession`, `anchorBlockWeeks`, `zone2WeeklyFloor`, `recencyWeight`, `recencySaturationDays`.
