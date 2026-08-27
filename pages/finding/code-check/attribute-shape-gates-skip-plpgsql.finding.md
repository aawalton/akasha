---
id: 4f0547fd-0822-509c-8f5f-5657b527d781
slug: attribute-shape-gates-skip-plpgsql
page-type-slug: finding
title: "Attribute shape gates skip plpgsql"
domain-slug: domain/global
---

# Claim

Both gates on attribute-predicate shape over `public.pages` read TypeScript only, so the deployed plpgsql carrying the same text-extraction predicate is in neither population — and registering a `.sql` path would not admit it, because the registry names a file for the check to re-scan and the scanner is a TypeScript reader.

# Evidence

`check-pages-gin-friendly-sql` walks two anchor prefixes — `PAGES_ACCESS_PG_PREFIX` and `PAGES_PROC_SRC_PREFIX` at `packages/infra/checks/src/checks/check-pages-gin-friendly-sql.ts:59-60` — over `**/*.{ts,tsx}`, per its header at line 14. `check-attribute-predicate-index-coverage` builds its population from `COVERED_ATTRIBUTE_PREDICATES` in `packages/infra/checks/src/lib/covered-attribute-predicates.ts`, whose six distinct `file:` values are all `.ts`. Both run `scanGinFriendlySql`, which matches SQL inside TypeScript template literals.

I ran `rg --multiline "attributes\s*->>\s*'[^']*'\s*\)?\s*(=|IN\s*\(|<>|!=)"` over the 87 `.sql` files in `packages/shared/supabase/database/schema/public/functions`. Seven match; five carry it as a WHERE predicate:

- `_pt_descendants.sql:20` — `c.attributes->>'extendsPageTypeId' = walk.id`
- `mark_pipeline_rebased.sql:23` — `p.attributes->>'branchSha' = p_branch_sha`
- `trigger_pipeline.sql:60, 98, 284, 285, 321` — `'status' IN (…)`, `'commitSha' <> p_commit_sha`
- `page_type_hard_delete.sql:44` — `(p.attributes->>'pageType') = (row.id)::text`
- `page_patch_by_id_if_status.sql:86` — `(p.attributes->>'status') = p_if_status`

`error_capture.sql`'s six are `CASE WHEN` projections rather than filters. `_build_property_definitions.sql`'s one is the lowering of a proc source that is itself registered.

What keeps these cheap is how each happens to be written: every one narrows on `page_type_slug` or on `p.id` first, and `trigger_pipeline`'s sit behind `attributes @> jsonb_build_object(…)` at lines 59, 283 and 320. Nothing structural holds that, so the next function added to the directory is ungated by construction.

The last two are in the parenthesised form the scanner misses even in TypeScript — `database/predicate-registry-rescan-blind.md` records that miss — so widening the population to `.sql` alone would not see them.

Not measured: query cost. I ran none of these against the database, so their being cheap rests on the narrowing predicates above rather than on any plan or timing.

Read at `ecf5f9518f` on `main`, 2026-08-07.
