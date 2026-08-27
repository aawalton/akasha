---
id: 06a6c572-0fb3-5b05-9b95-677f1cf415c7
page-type-slug: finding
title: "A persona reward concept stands beside the persona, so that Intent entry should leave outright"
domain-slug: domain/global
---

# Claim

The Intent entry "A persona reward concept stands beside the persona who wrote it, rather than in a row." is now true and should leave Intent outright. The page type holds no live row — never existed for its page-type row — and its whole population answers from files: n=3860 through the page query service. Nothing in the store half of this entry is outstanding.

# Evidence

Measured 2026-08-20T14:41-14:48Z, RUN not read.

Rows: `select count(*) from public.pages where page_type_slug = <slug> and deleted_at is null` returns 0. The `page-type` row for this slug never existed. The whole `pages` table now holds 136 live rows across six page types — property-definition 69, temper-character 29, temper-task 24, page-type 6, temper-account 4, temper-inventory-chunk 4 — and this type is not among them.

Files: the page type declares its pages at 39 `.reward-concepts.jsonl` sidecars beside the persona files, declared by `properties/persona-reward-concepts.md`. Asked through the page query service at `POST /q` with `{"page-type": "persona-reward-concept", "limit": 1}`, it answers n=3860. That is a count through the read path rather than a count of files on disk, which are different claims: a file that parses wrongly is dropped silently by the reader and would not appear in this number.

`page-types/persona-reward-concept.md` declares `files: none`. A type held this way has no glob, so a scan that counts `.md` files reads it as zero; the count above is through the read path.
