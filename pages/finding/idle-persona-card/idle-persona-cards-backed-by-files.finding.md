---
id: 1cf96a17-8adb-5e22-8b92-02536b556d85
slug: idle-persona-cards-backed-by-files
page-type-slug: finding
title: "An idle persona card is backed by files, so that Intent entry should leave outright"
domain-slug: page-type/idle-persona-card
---

# Claim

The Intent entry "An idle persona card is backed by files." is now true and should leave Intent outright. The page type holds no live row — soft-deleted 2026-08-20 for its page-type row — and its whole population answers from files: n=140 through the page query service. Nothing in the store half of this entry is outstanding.

# Evidence

Measured 2026-08-20T14:41-14:48Z, RUN not read.

Rows: `select count(*) from public.pages where page_type_slug = <slug> and deleted_at is null` returns 0. The `page-type` row for this slug soft-deleted 2026-08-20. The whole `pages` table now holds 136 live rows across six page types — property-definition 69, temper-character 29, temper-task 24, page-type 6, temper-account 4, temper-inventory-chunk 4 — and this type is not among them.

Files: the page type declares its pages at memory:idle-persona-cards/**/*.md. Asked through the page query service at `POST /q` with `{"page-type": "idle-persona-card", "limit": 1}`, it answers n=140. That is a count through the read path rather than a count of files on disk, which are different claims: a file that parses wrongly is dropped silently by the reader and would not appear in this number.

The second entry, "Every card names a persona who stands", I did not measure. Note that 3 of the 140 pages state no `id:`.
