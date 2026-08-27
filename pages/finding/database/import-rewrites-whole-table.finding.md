---
id: 435e8bab-d41a-5543-9a78-40b708f3bbea
slug: import-rewrites-whole-table
page-type-slug: finding
title: "Import rewrites whole table"
domain-slug: domain/database
---

# Claim

Every health import pass rewrites the whole of `public.health_samples`, and each pass makes the next one more expensive.

Three bursts on 2026-08-09, between 11:06 and 11:29 UTC, each ran about 815 upsert requests and updated about 815,000 rows while `n_tup_ins` did not move at all: not one row was new. The same fingerprint cost 13,597 shared blocks per call on 08-07 and costs 20,927 today — a 52% rise across two days in which the table gained 674 rows.

# Evidence

Measured 2026-08-09 between 11:19 and 11:31 UTC, read-only against the live database.

`ops query-perf triage 896550098227390461` identifies the statement as PostgREST product code: `INSERT INTO public.health_samples (...) ON CONFLICT (user_id, metric, source_name, started_at, ended_at) DO UPDATE SET ...`, fed from a `json_to_recordset` payload.

`public.db_query_stats` for that queryid shows bursts rather than a shifted plan. 815 calls across 11:06–11:09, 815 across 11:18–11:21 and 816 across 11:25–11:29 on 2026-08-09, and 815 across 22:05–22:09 on 2026-08-07. Between bursts the fingerprint runs one to ten calls at 0.2 ms and about 20 blocks; inside them every call runs 21–24 ms at 20,665–20,962 blocks. The 08-07 burst ran the same call count at 13,597–16,987 blocks.

Two samples of `pg_stat_user_tables` for the table. During the 11:25 burst: `n_tup_ins` 815,111, `n_tup_upd` 1,656,325, `n_tup_hot_upd` 26,456. At 11:29:49: `n_tup_ins` 815,111, `n_tup_upd` 2,445,251, `n_tup_hot_upd` 42,982. That is 788,926 row updates and zero row inserts between them. A further pair taken 90 seconds apart showed `n_tup_upd` unchanged, so the load is bursty rather than a continuous loop.

`select date_trunc('day', created_at at time zone 'UTC'), count(*) from public.health_samples group by 1` returns 814,207 rows created 2026-08-07 and 674 created 2026-08-09. All rows carry one `user_id`, two metrics and nine sources, spanning 2014-09-25 to 2026-08-09.

The table is 489 MB over a 179 MB heap, with indexes of 39, 154 and 116 MB, and carries no trigger and no rule. `last_autovacuum` ran 11:21 the same morning. The arbiter index `health_samples_user_metric_source_span_key` matches the `ON CONFLICT` target column for column and in order, and is unique, valid and ready.

The bursts trace to the seats working #18146 and #18148, whose dispatch prompts record `ops elaine health-import` being run against a fresh Apple Health export to recover an active-energy span lost behind an advanced HealthKit anchor.
