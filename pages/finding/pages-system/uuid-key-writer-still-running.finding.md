---
id: 5a224c9b-e9ac-53a3-a8f0-da561becca2e
page-type-slug: finding
title: "UUID key writer still running"
domain-slug: domain/pages-system
---

# Claim

Whatever writes attribute keys as property-definition UUIDs is still running, and its newest bulk write is three days old. Four `project` rows share `updated_at` to the microsecond at 2026-08-04 10:51:17.209874, one of them carrying its `title` under a UUID key with no live `title` beside it, and `calendar-event-source` seq 1 was written again this morning. Fourteen instances stand across four page types, and every instrument passes them by the ratified dual-key convention.

# Evidence

Read 2026-08-07 while emptying `dirty/skills/alan-harness/findings.md`, which recorded this class on 2026-07-27 and corrected its cause hypothesis on 2026-07-28. That document is queued for removal. Every figure below comes from re-running its own census SQL.

The census: `jsonb_object_keys(attributes)` matched against a uuid regex over live `public.pages`, left-joined to `property-definition` rows on `id`. Fourteen instances over four page types — `project` 5 (5 rows), `story-chapter` 6 (1 row), `calendar-event-source` 2 (1 row), `error` 1 (1 row). The 2026-07-27 reading was fifteen.

WHAT IS NEW. Ordering by `updated_at` shows the writer did not stop.

`calendar-event-source` seq 1 was last written **2026-08-07 08:40:17**, this morning, eleven days after it was named the only live sample. Both its UUID keys (`baseUrl`, `providerClient`) are still duplicated by a live correctly-keyed attribute, so nothing on that row is at risk. It is still the reproducible case.

Four `project` rows — 9776, 10031, 11813, 11593 — share `updated_at` **2026-08-04 10:51:17.209874** to the microsecond. One statement, four rows: a bulk write, and a DIFFERENT one from the 2026-06-12 16:31:13.674268 event the earlier correction identified. Only one row now carries that older timestamp. Row **11593 holds its `title` under a UUID key with no live `title` key**, so a project's title is where no title lookup reaches.

`story-chapter` 14325 (`019ec829-d5ee-7100-ade3-a53e796c67a1`) was written 2026-08-04 17:56.

A DISCREPANCY I DID NOT RESOLVE. `pages/finding/pages-system/dual-key-shadows-a-live-value.finding.md`, filed today, reads that same row as carrying three UUID keys with a live `text` beside the shadowed draft. My census resolves six on it and reports no live slug key for `text` or `seq`. `ops page show` may render resolvable UUID keys under their slugs where raw SQL does not; I did not establish which reading is right.

Not measured: what writes these rows. The earlier `ops project update` hypothesis was falsified at source and is not revived.
