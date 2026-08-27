---
id: 51c8717d-1f17-5705-bac6-f4d02f26bc13
page-type-slug: finding
title: "Intent residue after vocabulary removal"
domain-slug: barred-meaning/project
---

# Claim

`intent` was removed from the project status vocabulary, and the estate still explains itself in terms of it in eight places across production code, test prose and database fixtures — the same defect this row cleared for three other rungs, left standing for a fourth.

# Evidence

Measured on the code tree at `origin/main` 9bf8c78b, after #17806 landed.

`intent` is not in `PROJECT_STATUS_VALUES` and no ladder holds it. It is still named as though it were live in production comments at `lib/project-transitions.ts` (twice — the `awaiting_manager_claim` gloss says a defined parent sits "between `intent` and `understand`", and the child claim-wait gloss says a child "that had FINISHED `intent`"), at `lib/raw-capture-statuses.ts` (the capture front is glossed "`problem` … `intent`", naming two removed rungs), and at `lib/being-defined.ts`.

It is also seeded as a live value by database and integration fixtures that write it to the store: `projects/cli/src/project/move-to-obligation-gate.integration.test.ts` seeds a parent at it and arranges four moves from it, and `projects/cli/src/pure/project-census.unit.test.ts` builds its shared row fixture at it.

#17806 removed `plan`, `testing` and `verification_plan` and rewrote every explanation that turned on them, including the two the row named. It deliberately did not sweep `intent`: its objective named `settled-boundary.ts` alone, and widening the diff to a fourth rung would have put a change nobody had scoped through the same deploy. `settled-boundary.ts` and `types.ts` are clear of it because that row's own criteria and its blast radius reached them.

`check-retired-status-vocabulary` does not catch this: its `RETIRED_STATUS_LITERALS` is a declared list from the custody rename and holds six names, none of them `intent`, so nothing reports the residue. The same is true of `plan`, `testing` and `verification_plan` now — a sweep is what would find them, not the guard.
