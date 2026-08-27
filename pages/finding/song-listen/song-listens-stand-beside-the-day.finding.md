---
id: 2848e6d4-0c8e-514c-a585-a0009240d75a
slug: song-listens-stand-beside-the-day
page-type-slug: finding
title: "A song listen stands beside the day it was played on, so that Intent entry should leave outright"
domain-slug: page-type/song-listen
---

# Claim

The Intent entry "A song listen stands beside the day it was played on, rather than in a row." is now true and should leave Intent outright. The page type holds no live row — never existed for its page-type row — and its whole population answers from files: n=599 through the page query service. Nothing in the store half of this entry is outstanding.

# Evidence

Measured 2026-08-20T14:41-14:48Z, RUN not read.

Rows: `select count(*) from public.pages where page_type_slug = <slug> and deleted_at is null` returns 0. The `page-type` row for this slug never existed. The whole `pages` table now holds 136 live rows across six page types — property-definition 69, temper-character 29, temper-task 24, page-type 6, temper-account 4, temper-inventory-chunk 4 — and this type is not among them.

Files: the page type declares its pages at `data: jsonl` sidecars beside the 11 `music-day` pages, declared by `properties/music-day-listens.md`. Asked through the page query service at `POST /q` with `{"page-type": "song-listen", "limit": 1}`, it answers n=599. That is a count through the read path rather than a count of files on disk, which are different claims: a file that parses wrongly is dropped silently by the reader and would not appear in this number.
