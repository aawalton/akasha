---
id: 317cb166-5c1f-5f44-9bed-8a623636fa1c
page-type-slug: finding
title: "Drift baseline window sits on trough"
domain-slug: domain/query-performance
---

# Claim

A trailing-7-day baseline is too short for fingerprints that vary by an order of magnitude across the 22 days `public.db_query_stats` retains. One fingerprint ran at 1,000 to 4,000 shared blocks per call across the first ten retained days, 442 to 720 across the next ten, and stands at 1,363 now. The alert reads that return as a 6.9x regression, because its baseline window falls entirely on the quietest stretch in the whole record.

# Evidence

Read at 05:25 UTC on 2026-08-16, after `query-plan-drift-regression` fired for queryid -9103971312347135299 at 6.9x its trailing-7-day baseline.

`public.db_query_stats` reaches back to 2026-07-25, so every figure below is drawn from the whole store rather than a window inside it.

Shared blocks per call by day for this fingerprint, 07-25 through 08-16: 712, 1056, 1313, 1299, 1439, 2240, 1051, 3994, 1533, 2051, 1521, 720, 587, 641, 549, 620, 571, 442, 465, 476, 490, 742, 917.

Ms per call over the same days: 31.78, 15.91, 20.13, 26.09, 29.15, 41.09, 16.75, 80.86, 21.88, 28.71, 25.13, 4.28, 4.72, 8.01, 4.57, 4.44, 8.71, 3.14, 3.95, 3.68, 3.37, 15.49, 14.87.

The trailing seven days the rule compares against cover 08-09 to 08-15, reading 620, 571, 442, 465, 476, 490 and 742 blocks per call — the lowest run in the record. Eleven of the twenty-three retained days sit above today's figure.

Over the thirty minutes to 05:25 the fingerprint made 90 calls at 1,363 blocks per call and 35.92 ms per call, which is 26.4 ms per 1,000 blocks. Its own worst retained day, 07-25, reads 44.6 on that measure and its quietest, 08-11, reads 7.1.

Across the same thirty minutes the database as a whole ran at 2.30 ms per 1,000 shared blocks, which is inside the quiet band, so the host is not adding to this.

The same fingerprint fired on 08-16 at 00:03 and cleared at 01:38 without anything being done to it.
