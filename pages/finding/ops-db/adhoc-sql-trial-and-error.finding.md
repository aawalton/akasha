---
id: 746e4d84-4d73-5959-9f94-7e333826fc8b
page-type-slug: finding
title: "Adhoc SQL trial and error"
domain-slug: domain/global
---

# Claim

Hand-written analytical SQL against this database fails on the schema rather than on the logic, and does so in runs — one session hit an aggregate-with-SRF error, then an ambiguous column, then a `pg_size_pretty` overload across four successive queries. Column names are the recurring shape, and one category of thirty-one sightings is a single wrong column on `public.pages`.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 11 rows (seq 5061, 5134, 5166, 5207, 5209, 5219, 5234, 5276, 5292, 5293, 5295) carrying 43 sightings; 10 at `accumulating` and 1 at `dispatched` (seq 5293), so part of this was already handed to somebody.

Wrong columns recorded: `query_id` for `queryid`; `key` on `public.pages`, which has no such column (thirty-one sightings, `dispatched`); `blk_read_time` on a `pg_stat_statements` that no longer carries it. Type errors: `attributes->>'pipeline'` compared to a uuid subquery with no cast, giving `operator does not exist: text = uuid`. An unbounded aggregate over `pages` hit `statement_timeout` with no row-count precheck ahead of it. psql was invoked with the `\gx` meta-command inside a non-interactive `-c`, and separately run against a local unix socket with no `$DATABASE_URL`, failing on a missing socket at `/var/run/postgresql/.s.PGSQL.5432`.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
