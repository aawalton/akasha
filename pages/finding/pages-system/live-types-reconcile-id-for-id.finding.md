---
id: cd55dc3e-03a4-5ad1-ae40-4da0cfb272c6
page-type-slug: finding
title: "Every migrated live page type reconciles id-for-id"
domain-slug: domain/pages-system
---

# Claim

Across all 25 live page types, none has a row count agreeing with its file count while the ids disagree. Every one of the 1,946 live rows belonging to a type the page query service answers for has a file stating the same id, bar two. The whole residue is four types that never got a `page-types/*.md` document — `agent`, `property-definition`, `temper-watcher` and `collection-template` — and the service refuses each outright rather than answering short.

# Evidence

Measured 2026-08-20 against `DATABASE_ADHOC_URL` and the running `page-query-service.service`, by `POST /q` with no `limit`, so `n` is the whole total. Live means `deleted_at is null`. Both instruments were proved first: an impossible slug returns 0, an undeclared `where` key returns 400 with `absent`, an off-roster type returns 404.

25 live types, 4,737 live rows. Nineteen answer, and fourteen of those reconcile exactly — rows, files and matched ids all equal, nothing unmatched on either side. The five with anything to report:

| type | rows | files | matched | row, no file | file, no row | no id stated |
|---|---|---|---|---|---|---|
| daily-tracking | 91 | 121 | 91 | 0 | 0 | 30 |
| idle-persona-card | 137 | 140 | 137 | 0 | 0 | 3 |
| page-type | 25 | 367 | 23 | 2 | 272 | 72 |
| persona | 40 | 41 | 40 | 0 | 0 | 1 |
| temper-completed-task | 1405 | 1434 | 1405 | 0 | 29 | 0 |

Six are refused with 404: `agent` (2,448 rows), `property-definition` (340), `temper-watcher` (3), and `collection-template`, `story-chapter`, `story-chapter-image` at zero rows each.

The two `page-type` rows with no file are `agent` and `temper-watcher`, the two live types holding no document. Its 272 unmatched files are types that exist only as files.

No answer carried a `faults` key, and the service was started after `3244ce733`, which reports faults beside a 200 at `services/page-query-service.ts:152` — so that is a measured zero, not an unreported one.

The `slug` column is NULL on 4,672 of the 4,737 rows, every type but `persona` and `page-type`. A reconciliation joining on it reports 98.6% of the corpus missing. This one identified rows by `id` alone.
