---
id: ff7fd17a-2265-5182-b927-2e3109e51222
slug: food-entries-land-in-files
page-type-slug: finding
title: "Every food entry Alan logs lands in a file, so that Intent entry should leave outright"
domain-slug: domain/global
---

# Claim

The Intent entry "Every food entry Alan logs lands in a file." is now true and should leave Intent outright. The page type holds no live row — never existed for its page-type row — and its whole population answers from files: n=85 through the page query service. Nothing in the store half of this entry is outstanding.

# Evidence

Measured 2026-08-20T14:41-14:48Z, RUN not read.

Rows: `select count(*) from public.pages where page_type_slug = <slug> and deleted_at is null` returns 0. The `page-type` row for this slug never existed. The whole `pages` table now holds 136 live rows across six page types — property-definition 69, temper-character 29, temper-task 24, page-type 6, temper-account 4, temper-inventory-chunk 4 — and this type is not among them.

Files: the page type declares its pages at memory:food/*.md. Asked through the page query service at `POST /q` with `{"page-type": "food", "limit": 1}`, it answers n=85. That is a count through the read path rather than a count of files on disk, which are different claims: a file that parses wrongly is dropped silently by the reader and would not appear in this number.

This entry says where a logged entry LANDS, so it binds the writer as well as the store. I measured the store and not the write path: I did not log a food entry, because that would write to Alan's own record.
