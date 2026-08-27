---
id: 451b33cd-4228-5917-bf57-a00138fe6fd6
slug: page-type-slug-unconstrained
page-type-slug: finding
title: "Page type slug unconstrained"
domain-slug: domain/pages-system
---

# Claim

`page-type-create.ts` step 6b tells its reader that duplicate page-type slugs "raise 23505 from the partial unique index at INSERT time". They do not. Every page-type row's `unique_key` composes to NULL, which the partial index excludes, so two `page_type_create` calls carrying one slug both commit. The duplicate then stands until some later resolution of that slug happens to raise.

# Evidence

The composition cannot see `slug`, so the key it produces for every page-type row is NULL and the partial index does not constrain the row.

`packages/shared/supabase/database/schema/public/functions/_pages_split_properties.sql` lines 27-29 route `slug` into the promoted-columns object and not into the attribute bag, under the comment "slug is single-sourced to the promoted column (no attribute mirror)". This is the landed state of the attribute strip that `slug-column-attribute-invariant.database.test.ts` describes as project #13979.

`page_type_create.sql` line 70 composes `v_uniqueKey` by passing `v_attrsWithDefaults` — which is `v_split_attrs` plus at most an `extendsPageTypeId` default — to `public._compose_unique_key`. `_compose_unique_key` returns NULL when any unique-flagged component is absent from `p_attributes` or is jsonb null. Whether or not the page-type root still flags `slug` unique, the flagged component is absent from the bag, so the result is NULL either way.

`packages/shared/supabase/database/schema/public/tables/pages.sql` line 198: `CREATE UNIQUE INDEX pages_unique_key_uniq_idx ON public.pages USING btree (page_type_slug, unique_key) WHERE ((deleted_at IS NULL) AND (unique_key IS NOT NULL))`. A NULL `unique_key` is outside the predicate.

Nothing else closes the gap. Line 114 of the same file makes `pages_page_type_slug_slug_idx` a plain btree, and line 107 excludes `page-type` from the UNIQUE `pages_page_type_slug_seq_idx`. The deployed `page_type_create` carries no collision guard: its five RAISE statements are not-authenticated (line 30), userId missing (42), userId mismatch (46), meta-row not found (67), and row vanished after rematerialize (140).

The one place the duplicate surfaces is `_page_type_id_by_slug`, which raises "page type slug "%" resolves to % live page-type rows; expected one" — after the fact, at whatever later call happens to resolve that slug, rather than at the write that created it.
