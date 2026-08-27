---
id: c26430b0-af2f-5610-9b59-f2050889699d
slug: unlanded-warning-reads-project-status
page-type-slug: finding
title: "Unlanded warning reads project status"
domain-slug: domain/database
---

# Claim

`baselineRebuild`'s applied-but-unlanded warning infers "unlanded" from the owning project's STATUS, never from whether the DDL is on main, so a project parked at a non-terminal status reads as baseline contamination forever. `findUnlandedMigrations` classifies on `isTerminalStatus` alone, and the warning it feeds then asserts of every row "not yet landed on main". The over-report is in the safe direction for a caution, but it inflates the only number a reader has for pricing a rebuild.

# Evidence

Read 2026-08-07 off the `~/code` checkout.

`packages/shared/supabase/migrations/cli/src/lib/baseline-rebuild.ts:215-244` is the whole of `findUnlandedMigrations`. It loads each applied migration's owning project, selecting `seq` and `status` and nothing else, then keeps a migration exactly when `status !== "" && !isTerminalStatus(status)`. No read of `origin/main`, of the schema tree, or of any DDL enters the function.

`reportUnlanded` at `:246-259` prints what that set is taken to mean: "Their DDL is present in the rebuilt baseline but not yet landed on main; the drift gate will surface them on affected regens. Re-run baseline-rebuild after these projects land to clear the contamination." Landedness is asserted; project status is what was measured.

The two come apart in at least one live case. `packages/shared/supabase/database/schema/public/tables/location_traces.sql` is tracked on main, and the source this was ingested from records migration #5476 (`public.location_traces`) as flagged unlanded under project #15551 at `someday_maybe`. I confirmed the file; the migration seq and the project status are row state I did not re-query, and both move.

Found emptying `dirty/skills/pages-system/findings.md`, where it was recorded 2026-07-28 by `worker-16859`.
