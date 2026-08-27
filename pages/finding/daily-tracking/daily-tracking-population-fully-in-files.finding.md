---
id: 1b0d5811-c000-5996-9427-dfdd32daf9ba
slug: daily-tracking-population-fully-in-files
page-type-slug: finding
title: "Daily tracking is backed by files, so that Intent entry should leave outright"
domain-slug: page-type/daily-tracking
---

# Claim

The Intent entry "Daily tracking is backed by files." is now true and should leave Intent outright. The page type holds no live row — soft-deleted 2026-08-20T14:10:40Z for its page-type row — and its whole population answers from files: n=121 through the page query service. Nothing in the store half of this entry is outstanding.

# Evidence

Measured 2026-08-20T14:41-14:48Z, RUN not read.

Rows: `select count(*) from public.pages where page_type_slug = <slug> and deleted_at is null` returns 0. The `page-type` row for this slug soft-deleted 2026-08-20T14:10:40Z. The whole `pages` table now holds 136 live rows across six page types — property-definition 69, temper-character 29, temper-task 24, page-type 6, temper-account 4, temper-inventory-chunk 4 — and this type is not among them.

Files: the page type declares its pages at memory:daily-tracking/*.md. Asked through the page query service at `POST /q` with `{"page-type": "daily-tracking", "limit": 1}`, it answers n=121. That is a count through the read path rather than a count of files on disk, which are different claims: a file that parses wrongly is dropped silently by the reader and would not appear in this number.

The second entry, "Every reading of Alan's body for a day stands on that day", I did not measure and take no position on. Note also that 30 of the 121 pages state no `id:`.
