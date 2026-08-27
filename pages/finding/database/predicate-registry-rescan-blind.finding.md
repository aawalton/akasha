---
id: a730114b-cb7c-558b-9dd2-07bfb08f5899
page-type-slug: finding
title: "Predicate registry rescan blind"
domain-slug: domain/database
---

# Claim

`check-attribute-predicate-index-coverage` re-scans the six files `COVERED_ATTRIBUTE_PREDICATES` names, and finds no keys at all in two of them, so its unregistered-key direction is inoperative over a third of its own cohort while the check reports success.

# Evidence

The check builds its population from the registry — `const files = new Set(COVERED_ATTRIBUTE_PREDICATES.map((e) => e.file))` in `packages/infra/checks/src/checks/check-attribute-predicate-index-coverage.ts` — then calls `scanAttributeEqualityKeys` per member, which runs `scanGinFriendlySql` from `packages/infra/checks/src/lib/ts-pg-gin-friendly-queries.ts`.

I ran that scanner over all six registry files as the check runs it. Four return their registered keys: `load-step-status-by-pod-names.ts` returns `podName` and `launchedPodName`, `_build_property_definitions.ts` returns `pageType`, `load-failed-pipelines-with-newer-siblings.ts` returns `branch`, `load-main-pipeline-seeds-by-commit-shas.ts` returns `commitSha`. Two return zero: `packages/shared/pages/access/src/filters-where.ts` and `packages/shared/pages/access/src/pg/load-dispatching-steps.ts`.

The cause is the matcher. `LHS_TEXT_EQ_RE` requires the key's closing quote to be followed by whitespace then `=`. `load-dispatching-steps.ts:41` writes `AND (attributes->>'status') = 'dispatching'`, where a `)` stands between them. `filters-where.ts` emits through builder calls and template substitutions — `attributes->>${cond.key}` at :272 — and a substitution becomes a space when the scanner joins static slices, so no literal key survives.

So `verifyFilePredicatesRegistered` gets an empty key list for both and returns nothing. A second attribute predicate added to either, in the form both already use, is admitted in silence rather than refused as an unregistered key, which is what that direction exists to catch. Both are live paths.

The scanner's header states a false-negative policy for its refusal job. Reused as this re-scan it inverts: a miss drops a registered file from the guard while `CARVE_OUT_FILES`, off the same array, keeps it exempt from `check-pages-gin-friendly-sql`.
