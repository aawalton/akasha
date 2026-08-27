---
id: 4e6518d1-85f1-5317-9267-90e60ae97df1
slug: backing-hand-copied
page-type-slug: finding
title: "The claude-account row's backing attribute is a hand-set copy and nothing projects one from the other"
domain-slug: domain/global
---

# Claim

The `backing` attribute now standing on the `claude-account` page-type row is a hand-set copy of what that page type's own document already says, and nothing projects one from the other.

# Evidence

A page type's backing is not written anywhere in the corpus. It is read off `files:` — `instructions:claude-accounts/*.md` against `none` — and four places test it that way, each by asking whether the repo and the glob came back null: `tools/lib/page-types.ts` at `pageTypeAt`, `tools/lib/page-derive.ts` at `rows`, `tools/lib/page-index.ts`, and `tools/lib/page-query.ts`.

The browser cannot reach any of that. It holds page-type rows out of the database and decides, at the moment it acquires a page type, whether to open a stream or fetch. So on 2026-08-19 a `backing` select of `file` against `database` was declared on the `page-type` page type (`01a01ad4-4ced-7a6f-b374-a8e405dfaff4`) and set to `file` on the `claude-account` row (`019db533-f381-7454-a6e4-fed5397cfd84`) by hand, for project #19430.

Two values now say the same thing with nothing holding them together. Changing `files:` on `page-types/claude-account.md` moves the corpus and leaves the row, and a row saying `file` for a page type whose pages are no longer files sends the browser fetching an answer that will not come.

The whole definition tier is already a hand-kept duplicate — page types and property definitions stand in both stores and nothing projects either — so this adds one field to a set that already drifts rather than opening a new way to drift. It goes when that tier moves onto files, which is the theme's step rather than this initiative's.
