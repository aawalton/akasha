---
id: 4e64274f-7998-5566-addd-194fc1a1a496
slug: page-write-block-cost-quadrupled
page-type-slug: finding
title: "Page write block cost quadrupled"
domain-slug: domain/query-performance
---

# Claim

A single-row write to `public.pages` addressed by id now touches about four times the shared blocks it did 25 days ago, climbing from around 350 per call to around 1,400 across the whole retained store. Its time per call has roughly doubled over the same span. The statement has not changed, so this tracks the table growing rather than a regression in the query. It is a steady trend rather than the swings other `pages` fingerprints show, and it is what the alert on it is sitting on top of.

# Evidence

Read at 11:45 UTC on 2026-08-16 for queryid 7984240067769200172, a PostgREST-generated call to `public.page_patch_by_id`. `public.db_query_stats` retains this fingerprint from 2026-07-22, so the figures below span the whole store rather than a window inside it.

Shared blocks per call by day, 07-22 through 08-16: 363, 337, 465, 490, 712, 831, 853, 902, 1010, 744, 889, 871, 1225, 1164, 1195, 1180, 1019, 890, 1356, 1196, 882, 1121, 1379, 1060, 1359, 1440.

Ms per call over the same days: 3.13, 3.23, 6.36, 11.15, 4.23, 4.28, 4.69, 5.43, 6.38, 5.32, 5.20, 5.45, 6.56, 6.72, 6.37, 6.60, 7.20, 7.24, 8.69, 9.73, 5.62, 7.12, 7.98, 7.00, 19.03, 17.90.

`pages` holds 1,319,519 live rows and 78,618 dead. Its last autovacuum was 2026-08-14 19:16 and its last autoanalyze 2026-08-15 16:10; a manual vacuum and analyze ran at 2026-08-15 23:01 and did not change this fingerprint's blocks per call.

Today's alert is separable from the trend. By hour on 08-16 this fingerprint reads 921 blocks per call at 05:00, 869 at 09:00, 2,036 at 10:00 and 968 at 11:00, while its ms per call reads 11.20, 11.12, 15.75 and 59.07. Across the same hours the database as a whole ran at 2.21, 2.13, 3.71 and 7.01 ms per 1,000 shared blocks. At 11:00 the query did less block work than at 05:00 and took five times as long, alongside the host tripling in cost per block.

`shared_blks_read` totals 0 to 233 blocks an hour through 08-16, so almost every block is a buffer hit and nothing is being evicted from cache. `blk_read_time_ms` reads 0.0 in every hour, but `track_io_timing` is off on this server, so that figure carries no information.
