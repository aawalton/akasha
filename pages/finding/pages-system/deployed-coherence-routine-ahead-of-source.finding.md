---
id: c62d4c0d-f69c-56cc-9d46-b13247207b68
page-type-slug: finding
title: "The deployed coherence routine is ahead of its source"
domain-slug: domain/pages-system
---

# Claim

`_enforce_page_coherence` as deployed knows four coherence rule kinds. Its checked-in source knows three. Recompiling and deploying that routine from current source silently deletes a live page-coherence rule, and every instrument that could report it reads green.

# Evidence

Measured 2026-08-20 against `pg_proc.prosrc` on `postgres.postgres.svc.cluster.local`, read rather than called.

The source at `packages/shared/pages/proc/src/_enforce_page_coherence.ts` implements `valueIn`, `numericEqualityWhenPresent` and `requires`. The live routine implements those three and `markerSectionWhenEq`, with its own `v_text` and `v_marker` declarations and roughly 45 lines of body. `markerSectionWhenEq` occurs 0 times in the source and 1 time in the deployed text.

`_enforce_page_coherence.unit.test.ts` passes 2 of 2 while this stands. The test suite cannot see the drift, because it exercises the TypeScript rather than the routine.

The drift survived because nothing compares compiled output against what is deployed. The `.sql` files under `packages/shared/supabase/database/schema/public/functions/` are `pg_dump` mirrors carrying `-- GENERATED ... Do not hand-edit.`, not compiler output, and no check runs the compiler across the tree. A match between a source and its `.sql` means they agree today; it is not a build step anything enforces.

Of 102 non-test proc sources, 70 correspond to a live routine and 32 lower to nothing. Of those 70, 61 reproduce their deployed routine exactly once `pg_dump` cosmetics are normalised, 1 has drifted — this one — and 8 the compiler refuses outright.

Rebuilding this routine from source is a deploy, so nothing here is repairable without one.
