---
id: 6504712b-81a2-58f8-a080-6b0fb4218d2d
page-type-slug: finding
title: "CI pod service role ungrounded"
domain-slug: domain/global
---

# Claim

Every CI step pod carries a live Supabase service-role key unconditionally, and the ground stated in two places for the unit-test step needing one — that some unit tests call `installPageTypesFromLive` — is false: no `{unit,property,component}` test calls it, in its own bytes or through its imports.

# Evidence

Measured at code head `d01942409a`.

The key is in every pod regardless of any step's declaration. `pod-spec-env.ts` builds the base environment for every CI step pod and spreads `...supabaseSecretEnv(CI_SECRET_NAME)` into it at line 95, with a plain-valued `POSTGREST_SERVICE_ROLE_KEY` at line 94 beside it. `supabaseSecretEnv` in `secrets.ts:78` returns `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` as `secretKeyRef` entries. Nothing gates the spread on step, type or workflow, so striking the test step's own `environment` block would take nothing away from `check-unit-tests`.

Two surfaces state the ground, and both name the same call. `checks.workflow.ts:209` comments "Tests that call `installPageTypesFromLive` snapshot page-type rows" directly above the `environment` at 213-215 declaring `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. `run-workspace-tests.sh:67` gives the same ground for a different cost, naming the lane outright: "30s per-test timeout: some unit tests call `installPageTypesFromLive`".

No test in that lane makes the call. `grep -rln 'installPageTypesFromLive\|@shared/supabase-test-harness'` over `*.{unit,property,component}.test.{ts,tsx}` returns nothing. The non-test callers are `pod-reaper.test-helpers.ts`, `ci/worker/src/reactors/fixtures.ts` and `trigger-fixtures.ts`; the classifier compels a `database` suffix on anything carrying those tokens, and CI does not run that suffix in this lane.

Reach is not zero, and the difference is where a re-check would go wrong. I drove the hermeticity check's own walk over a repo-root graph with the boundary set replaced by the harness and its three callers and no source reader, so no exemption fired: one hit, `install-from-live-relation-targets.unit.test.ts` reaching `install-from-live.ts`. That test imports `relationTargets` and two types — the pure forward-relation predicate at line 202 — and calls no IO. So the module is reachable from the lane while the call is not, and a check keyed on module reach would report this as a live-database unit test.
