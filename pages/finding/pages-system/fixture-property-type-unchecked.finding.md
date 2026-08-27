---
id: a9443d91-6c3a-52e3-b991-a1a3029c6c21
slug: fixture-property-type-unchecked
page-type-slug: finding
title: "Fixture property type unchecked"
domain-slug: domain/pages-system
---

# Claim

`SeedPageTypeArgs.propertyDefinitions` is typed `readonly Record<string, unknown>[]`, so no test fixture's property-definition is checked against `PropertyType`. Eleven fixture literals across eight files in `packages/shared/pages/` spell the type `richText`, which the union does not declare — it declares `rich-document`. `_enforce_content_storage` branches on that exact string, so all eleven skip the blocks-array branch while appearing to exercise it, `rich-document-nesting-patch.database.test.ts` included.

# Evidence

Read 2026-08-07 against `~/code`.

`packages/shared/pages/core/src/types.ts:6-27` declares `PropertyType` as a 22-member string union. `rich-document` is a member; `richText` is not, in any casing.

`packages/shared/supabase/test-harness/src/harness.ts:214` reads `propertyDefinitions?: readonly Record<string, unknown>[]`. That is the whole of the checking — a literal handed to `seedPageType` is never compared against `PropertyDefinition` or `PropertyType`, so a misspelled member compiles.

`rg -uuu -c "richText" packages/shared/pages/` returns 11 occurrences across 8 files: `access/src/schema-validation`, `content-storage-tier`, `content-storage-tier-remove`, `content-storage-tier-patch-op`, `rich-document-nesting-patch` (2), `access/src/pg/move-content-to-attribute` (2), `move-attribute-to-content` (2), and `proc-compiler/src/pages-bulk-upsert.content-storage-guard.equiv` — all `.database.test.ts`.

The branch they miss: `packages/shared/pages/proc/src/_enforce_content_storage.ts:174` and its compiled twin `functions/_enforce_content_storage.sql:101` both read `WHEN d->>'type' = 'rich-document' THEN`, under a comment at :158 and :85 stating "rich-document ⇒ blocks array length ≥ 1; every other type ⇒ not". A fixture spelling `richText` falls to the every-other-type arm.

Two of the eight are named for what they cannot reach: `rich-document-nesting-patch` and `pages-bulk-upsert.content-storage-guard.equiv`.

A quarantined document reported three of these files on 2026-07-28. Re-measured here rather than relayed; the population is eight.

Searched `~/memory/findings/` with `rg -uuu -ni "richText|rich-document|seedPageType|SeedPageTypeArgs"`: two hits, both unrelated.
