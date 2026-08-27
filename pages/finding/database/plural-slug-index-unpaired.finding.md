---
id: b2af79ef-66f6-51b5-9817-df274a04686c
page-type-slug: finding
title: "Plural slug index unpaired"
domain-slug: domain/database
---

# Claim

A partial btree over `(page_type_slug, (attributes->>'pluralSlug'))` on `public.pages` and the single call it exists to serve are recorded together nowhere: neither side appears in `COVERED_ATTRIBUTE_PREDICATES`, and neither check that reads that registry could produce the pairing, so the index has no recorded reader and the predicate no checked index.

# Evidence

`packages/shared/supabase/database/schema/public/tables/pages.sql:51` holds `CREATE INDEX pages_active_page_type_slug_attr_plural_slug_idx ON public.pages USING btree (page_type_slug, ((attributes ->> 'pluralSlug'::text))) WHERE (deleted_at IS NULL)`.

`rg -n "attributes->>pluralSlug"` across the repo returns exactly one line: `packages/shared/pages/access/src/page-type.ts:188`, `.eq("attributes->>pluralSlug", pluralSlug)`, inside `getPageTypeByPluralSlug`. That is the index's whole readership.

`rg -n "pluralSlug|plural_slug"` over `packages/infra/checks/src/lib/covered-attribute-predicates.ts` exits 1 — no entry names either side.

Neither check could add one. `check-pages-gin-friendly-sql` walks two anchor prefixes, `packages/shared/pages/access/src/pg/` and `packages/shared/pages/proc/src/` (`check-pages-gin-friendly-sql.ts:59-60`); `page-type.ts` sits directly under `access/src/` and is in neither. And the predicate is a PostgREST builder argument rather than SQL in a template literal, so `scanGinFriendlySql` would not see it even inside the prefixes.

Both of the registry's directions therefore stay silent on this pair. `verifyRegistryAgainstSnapshot` at `covered-attribute-predicates.ts:157` walks registry entries, so an index nothing registers is never checked to exist or to index its key. `verifyFilePredicatesRegistered` at line 191 walks scanned keys from registered files, so a predicate in an unregistered, unscannable file is never demanded an entry.

The unused-index side has nothing to consult either. The only checks under `packages/infra/checks/src/checks/` carrying "unused" in their names are `check-ast-unused*` and `check-unused-deps*`, both over TypeScript, so no instrument compares an index on `pages` against its callers.

Not measured: the index's write cost, and whether the predicate is in fact served by it. I ran no `EXPLAIN` and no timing — the claim is about what is recorded, not about the plan.

Read at `ecf5f9518f` on `main`, 2026-08-07.
