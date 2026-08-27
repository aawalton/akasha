---
id: f2387da2-f793-50c0-8b3d-9e8723cd52f7
page-type-slug: finding
title: "Harness seeds a retired slug mirror"
domain-slug: domain/global
---

# Claim

`seedPageType` writes a page-type's `slug` into the attributes blob and derives the column from it, on the stated grounds that production's dual-write guarantees both. Production guarantees the opposite: 0 of 275 live page-type rows carry `attributes.slug`, because the dual-write was deliberately retired. The fixture is internally consistent, so nothing fails and nothing reports.

# Evidence

Measured on live 2026-08-07 over `public.pages where page_type_slug='page-type' and deleted_at is null`, counting rows, then rows with a non-empty `slug` COLUMN, then rows with a `slug` ATTRIBUTE, then rows with a `propertyDefinitions` attribute as the control: **275 | 275 | 0 | 275**.

The control makes the zero readable — the same `?` operator on the same rows returns 275 for `propertyDefinitions`, so it finds keys when they exist. A bare zero would be equally consistent with a broken predicate.

THE FIXTURE. `packages/shared/supabase/test-harness/src/harness.ts` inserts `(..., attributes, slug, parent_key) VALUES (..., $3::jsonb, ($3::jsonb)->>'slug', ($3::jsonb)->>'extendsPageTypeId')`, and its comment gives the reason: "Transient dual-write parity (#13856): slug is a promoted column with promoted-wins on read (flattenRow), so a seeded page-type row must carry its slug in BOTH the `slug` column and `attributes.slug` — production's dual-write + backfill guarantee this for every real row."

THE GUARANTEE WAS WITHDRAWN ON PURPOSE. `_pages_split_properties.sql:27-29` routes `slug` into the promoted-columns object and not into the attribute bag, under the comment "slug is single-sourced to the promoted column (no attribute mirror)" — the landed attribute strip that `slug-column-attribute-invariant.database.test.ts` names as #13979. The fixture cites #13856 for an invariant #13979 removed.

THE DIRECTION THAT COSTS. A query on page-type rows filtering `attributes->>'slug'` reads correct in the fixture and empty on live.

NOT MEASURED: whether anything still reads `attributes->>'slug'` on a page-type row. An index over `((attributes ->> 'slug'::text))` exists, so the expression is not dead everywhere.

Searched `~/memory/findings/` first: `rg -l -i "seedPageType|attributes.slug|dual-write" findings/` returns two, neither carrying this.
