---
id: 0a719081-bef9-529d-a392-9d40d205d0fd
slug: page-type-id-differs-across-stores
page-type-slug: finding
title: "A page type's document and its row carry different ids, so it has two identities and neither names the other"
domain-slug: page-type/page-type
---

# Claim

A page type's document and its database row carry different ids, so one page type has two identities and neither store can name the other's.

# Evidence

Checked on 2026-08-19 against the two monarch page types that have declaration documents.

`page-types/monarch-transaction.md` carries `id: 01a00785-037a-7000-bfe0-a153b042e42c`. The live `page-type` row for that slug carries `019db7a4-de54-7f94-880f-0cd8c47d7535`. `page-types/monarch-category.md` carries `019ffe81-2595-7000-9e0b-17e0d26bd77c` against the row's `019db7a4-d58a-7a16-9745-c088034dabbe`.

Neither document id resolves: `ops page-type show <id> --include-deleted` answers `Page-type not found` for both. The 10,945 `monarch-transaction` pages carry `pageTypeId` pointing at the row's id, not the document's.

It is silent because nothing keys off a page-type uuid. A sweep of both repositories for all eight monarch page-type uuids found no occurrence in SQL, TypeScript, YAML, JSON or markdown; every reader and writer dispatches on the slug string, and a file-backed page names its type by slug rather than by id.

The scope beyond monarch is unmeasured. 27 slugs stand in both stores across the corpus, and only these two were compared.
