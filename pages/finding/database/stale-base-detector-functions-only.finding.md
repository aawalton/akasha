---
id: 8b3602a8-cfee-525b-9669-1c7cc0033c93
slug: stale-base-detector-functions-only
page-type-slug: finding
title: "Stale base detector functions only"
domain-slug: domain/database
---

# Claim

A migration authored against a stale base is caught for function bodies and for nothing else in the schema, so a silently reverted index or constraint reaches main undetected.

# Evidence

`stale-function-base` is the estate's reversion detector. Its header states the failure it exists for: "a migration whose function bodies were generated against a base that main has since moved past … Any divergence — changed body, created on main after fork, dropped on main — means the migration was authored against a stale base and applying it would silently revert main's later change." It reads the committed snapshot at the branch's merge-base with `origin/main` and at `origin/main` HEAD via `git show`, and fails conservatively when the baseline cannot be resolved rather than passing.

Its reach is functions, stated in its own first line: "For every function the migration recreates (`CREATE OR REPLACE FUNCTION`, or a `DROP FUNCTION` + `CREATE FUNCTION` pair)".

Nothing covers the rest. `packages/shared/supabase/migrations/cli/src/lib/checks/registry.ts` holds the whole set — `secdefNullRoleHandling`, `secdefSearchPathSet`, `noRawProcMutation`, `droppedObjectDependents`, `staleFunctionBase` — and none of the other four compares anything against a base ref. So a regen rebuilt from a baseline missing a landed migration will drop that migration's index, constraint or column change out of `database/schema/<schema>/tables/*.sql`, present the deletion as the regenerating project's own diff, and meet no gate.

The gap is invisible in the ordinary way: a green pre-apply run and a run that had nothing to look at at this class produce the same output, and the reversion is visible afterwards only as a schema diff nobody flagged.

`dirty/docs/ts-to-plpgsql.md` recorded that the reversions actually measured as having landed on main were of exactly this kind — a reversion with no TS counterpart. That is an unverified claim from a quarantined source and is repeated here as its provenance rather than as a finding of mine; the coverage gap above I verified directly.

Found while ingesting that source, which is now emptied and removed, so the record would have gone with it.
