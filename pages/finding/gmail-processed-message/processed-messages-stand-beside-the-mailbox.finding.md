---
id: 73205eda-65f3-592b-b865-30ce2536a787
slug: processed-messages-stand-beside-the-mailbox
page-type-slug: finding
title: "A gmail processed message stands beside its mailbox, so that Intent entry should leave outright"
domain-slug: page-type/gmail-processed-message
---

# Claim

The Intent entry "A gmail processed message stands beside the mailbox it was read from, rather than in a row." is now true and should leave Intent outright. The page type holds no live row — never existed for its page-type row — and its whole population answers from files: n=1031 through the page query service. Nothing in the store half of this entry is outstanding.

# Evidence

Measured 2026-08-20T14:41-14:48Z, RUN not read.

Rows: `select count(*) from public.pages where page_type_slug = <slug> and deleted_at is null` returns 0. The `page-type` row for this slug never existed. The whole `pages` table now holds 136 live rows across six page types — property-definition 69, temper-character 29, temper-task 24, page-type 6, temper-account 4, temper-inventory-chunk 4 — and this type is not among them.

Files: the page type declares its pages at a `data: jsonl` sidecar beside the mailbox, declared by `properties/gmail-mailbox-processed-messages.md`. Asked through the page query service at `POST /q` with `{"page-type": "gmail-processed-message", "limit": 1}`, it answers n=1031. That is a count through the read path rather than a count of files on disk, which are different claims: a file that parses wrongly is dropped silently by the reader and would not appear in this number.
