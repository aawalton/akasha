---
id: bb4ef403-66a7-5795-b51b-d5fe28f50dbc
page-type-slug: finding
title: "A persona reward image is backed by files, so that Intent entry should leave outright"
domain-slug: domain/global
---

# Claim

The Intent entry "A persona reward image is backed by files." is now true and should leave Intent outright. The page type holds no live row — never existed for its page-type row — and its whole population answers from files: n=101 through the page query service. Nothing in the store half of this entry is outstanding.

# Evidence

Measured 2026-08-20T14:41-14:48Z, RUN not read.

Rows: `select count(*) from public.pages where page_type_slug = <slug> and deleted_at is null` returns 0. The `page-type` row for this slug never existed. The whole `pages` table now holds 136 live rows across six page types — property-definition 69, temper-character 29, temper-task 24, page-type 6, temper-account 4, temper-inventory-chunk 4 — and this type is not among them.

Files: the page type declares its pages at memory:persona-reward-images/*.md. Asked through the page query service at `POST /q` with `{"page-type": "persona-reward-image", "limit": 1}`, it answers n=101. That is a count through the read path rather than a count of files on disk, which are different claims: a file that parses wrongly is dropped silently by the reader and would not appear in this number.
