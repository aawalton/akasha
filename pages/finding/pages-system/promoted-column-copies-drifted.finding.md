---
id: eb516f59-3c6c-5607-ad68-f5e3046bb330
page-type-slug: finding
title: "Promoted column copies drifted"
domain-slug: domain/pages-system
---

# Claim

Four hand-kept copies of the promoted-column list stand in `packages/shared/pages/**`, they have already drifted to three different lengths, no check holds them in agreement, and the comment that asserts they agree is false.

# Evidence

Read on 2026-08-09, each site opened directly rather than taken from a report.

- `packages/shared/pages/access/src/routing-core.ts:17` — `PROMOTED_COLUMN`, the canonical list, 13 keys: `id`, `seq`, `title`, `icon`, `slug`, `userId`, `pageTypeId`, `pageTypeSlug`, `createdAt`, `updatedAt`, `deletedAt`, `uniqueKey`, `parentKey`.
- `packages/shared/pages/proc/src/_pages_row_matches.ts:233` — `PROMOTED_COLUMN_KEYS`, 13 keys, identical to the canonical list.
- `packages/shared/pages/proc/src/page-attributes.ts:15` — `PROMOTED_COLUMN_KEYS`, 10 keys. Missing `slug`, `uniqueKey` and `parentKey`.
- `packages/shared/pages/proc-compiler/src/struct-access.ts:37` — `STRUCT_FIELDS.pagesRow`, 12 entries. Missing `uniqueKey` and `parentKey`, and carrying `attributes`, which is not a promoted column.

Three distinct lengths, so at most one of the four is right.

`rg -l "PROMOTED_COLUMN|STRUCT_FIELDS" packages/infra/checks/` returns nothing, so no check compares the copies. A search for the canonical name reaches the first three sites and never the fourth, which is spelled `STRUCT_FIELDS.pagesRow` — so an author who searches that name and updates every hit has done the visible work and still left the compiler's copy behind.

The comment at `page-attributes.ts:8-14` states that "Both TS sites encode the same fixed 10-key set" and that drift "would surface immediately in `_pages_project.equiv.database.test.ts`". The first clause is false against its own sibling, which carries 13. The second was not measured here and is recorded as the comment's claim rather than adopted.

The two tiers fail differently, and the quiet one is worse: the compiler's list refuses an unlisted field at compile time, where the proc tier's silently treats an unlisted key as an attribute, so a promoted key added to three sites and not the fourth is written to the `attributes` jsonb with nothing reporting it.
