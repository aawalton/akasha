---
id: 7930bfc5-2f7f-5200-8657-77535dbaa32d
page-type-slug: finding
title: "Pipeline status nested loop misestimate"
domain-slug: domain/query-performance
---

# Claim

The once-a-minute pipeline status query does about 330 times the block work it did before `pages` was analysed. Postgres estimates 2 rows for a jsonb containment predicate that matches 3,850, and nested-loops over every one. It is not a sequential scan and no index is missing: both sides still use the GIN index. A higher statistics target would not correct it, because Postgres collects no per-key selectivity inside a jsonb column.

# Evidence

Read at 00:25 UTC on 2026-08-16, for queryid 3095893069018364090.

`public.db_query_stats` per minute. Before 23:01 UTC on 2026-08-15: 1,269 to 2,625 blocks per call, mostly 4 to 15 ms per call. From 23:02, at one call per minute without a break through 00:16 on 08-16: 395,118 to 971,934 blocks per call and 936 to 19,717 ms per call. `shared_blks_read` is 0 throughout, so the blocks are all buffer hits. `blk_read_time_ms` also reads 0.0, but `track_io_timing` is off on this server, so that figure carries no information.

`pg_stat_user_tables` for `pages` reports `last_vacuum` 2026-08-15 23:01:17 and `last_analyze` 23:01:24, both manual. `last_autoanalyze` is 2026-08-15 16:10:23 and nothing has analysed the table since. `n_dead_tup` is 18,824 against 1,317,523 live, so the vacuum held.

The query takes an array of workflow names and, per name, joins `public.pages` as pipeline to `public.pages` as workflow on `w.attributes @> jsonb_build_object('pipeline', p.id)`, narrows the pipeline side with `p.attributes @> jsonb_build_object('branch', $2)`, and takes `ORDER BY p.seq DESC LIMIT 1`.

`EXPLAIN` on a reconstruction with three workflow names and branch `main` plans a nested loop whose outer Bitmap Heap Scan on the pipeline side estimates 2 rows, at a whole-query cost estimate of 1,602. That predicate matches 3,850 rows. The table holds 15,973 live pipelines and 56,008 live workflows.

3,850 pipelines against 3 workflow names is 11,550 inner bitmap scans of a 948 MB GIN index, which is the order of the 600,000 blocks per call observed. Both sides of the plan choose `pages_active_page_type_slug_attributes_gin_idx`; no sequential scan appears.

The reconstruction supplies its own parameters, so the plan it prints is the plan for those values rather than a capture of the one production runs.
