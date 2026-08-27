---
id: 2e5af41f-9f82-5b40-ac01-f0195d9e9b00
slug: baseline-rebuild-discloses-too-late
page-type-slug: finding
title: "Baseline rebuild discloses too late"
domain-slug: domain/database
---

# Claim

`baselineRebuild` discloses what a rebuild costs the estate only after the destructive step has run, so the disclosure cannot inform the decision it exists for. `dropAndSweep` has already dropped and restored `schema_baseline` by the time `findUnlandedMigrations` reports which applied-but-unlanded migrations were baked into the shared baseline, so the operator learns the cost once it is paid. The remedy is positional rather than new logic: run the survey first and it is a preflight.

# Evidence

Read 2026-08-07 off the `~/code` checkout.

`packages/shared/supabase/migrations/cli/src/lib/baseline-rebuild.ts` declares `dropAndSweep` at `:59` and `findUnlandedMigrations` at `:215`. Inside `baselineRebuild`, declared at `:262`, the calls run in this order: `const orphans = await dropAndSweep(adminPool)` at `:271`, and `unlanded = await findUnlandedMigrations(applied)` at `:312`. Forty-one lines separate them and the destructive one is first.

The verb is reached as `ops migration baseline-rebuild`. `pages/finding/database/baseline-verify-recommends-the-wrong-row.finding.md` records one live run of it — "cleared it in 66 seconds over 331 seqs" — so this is a verb operators do run against the shared baseline rather than a dormant path.

Not established here: whether any operator has in fact been surprised by the ordering, and whether moving the call is safe with respect to the pool and the `applied` set `findUnlandedMigrations` takes as its argument. The reading is of the order alone.

Found emptying `dirty/skills/pages-system/findings.md`, where it was recorded 2026-07-28 by `worker-16859` and deliberately not built, that row having been scoped to what recommends the verb rather than to the verb itself.
