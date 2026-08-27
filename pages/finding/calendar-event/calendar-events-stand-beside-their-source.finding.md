---
id: 08ea28a0-4b98-5fa1-94ae-62d4e333565c
page-type-slug: finding
title: "A calendar event stands beside its source, so that Intent entry should leave outright"
domain-slug: page-type/calendar-event
---

# Claim

The Intent entry "A calendar event stands beside the source that publishes it, rather than in a row." is now true and should leave Intent outright. The page type holds no live row — never existed for its page-type row — and its whole population answers from files: n=1034 through the page query service. Nothing in the store half of this entry is outstanding.

# Evidence

Measured 2026-08-20T14:41-14:48Z, RUN not read.

Rows: `select count(*) from public.pages where page_type_slug = <slug> and deleted_at is null` returns 0. The `page-type` row for this slug never existed. The whole `pages` table now holds 136 live rows across six page types — property-definition 69, temper-character 29, temper-task 24, page-type 6, temper-account 4, temper-inventory-chunk 4 — and this type is not among them.

Files: the page type declares its pages at a `data: jsonl` sidecar beside the source, declared by `properties/calendar-event-source-events.md`. Asked through the page query service at `POST /q` with `{"page-type": "calendar-event", "limit": 1}`, it answers n=1034. That is a count through the read path rather than a count of files on disk, which are different claims: a file that parses wrongly is dropped silently by the reader and would not appear in this number.

`page-types/calendar-event.md` declares `files: none`, which is how a type whose pages live in a parent's sidecar is spelled.
