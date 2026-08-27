---
id: b7d3e6c7-109f-5116-b77b-669b29a84372
page-type-slug: finding
title: "Throughput reading tripled database load"
domain-slug: domain/query-performance
---

# Claim

A dashboard reading function reads about 660,000 shared blocks per call, and something began calling it 734 times an hour today. In its peak hour it did 63 percent of all block work on the database and tripled the database's total throughput. The host absorbed that with no loss of speed at all — cost per block held between 1.90 and 2.03 ms per thousand right through — which also rules out block volume as the cause of the slow episodes seen on 08-15 and 08-16.

# Evidence

Read at 13:30 UTC on 2026-08-17 for queryid -2057291801942163058, after `query-sustained-mean-budget-exceeded` fired for it at 1027 ms against a 250 ms budget.

The statement is a PostgREST call to `public.get_throughput_reading(p_day)`. `public.db_query_stats` holds it on two days only: 2026-07-24, one call at 970.1 ms and 648,877 shared blocks; and 2026-08-17, 1,382 calls at 1,039.8 ms and 660,420 blocks. Cost per call has therefore not changed since the fingerprint first appeared. What changed is how often it is called.

By hour on 08-17, as database-wide million blocks, this fingerprint's million blocks, its share, its calls, and database-wide ms per 1,000 blocks:

- 00:00 — 282 / 0 / 0% / 0 / 1.73
- 04:00 — 222 / 0 / 0% / 0 / 2.05
- 08:00 — 221 / 0 / 0% / 0 / 1.99
- 10:00 — 236 / 0 / 0% / 0 / 1.90
- 11:00 — 476 / 203 / 43% / 309 / 2.00
- 12:00 — 777 / 485 / 63% / 734 / 1.90
- 13:00 — 440 / 224 / 51% / 339 / 2.03

The database held between 220 and 236 million blocks an hour from 00:00 to 10:00 and reached 777 million at 12:00, a rise of about 3.3 times, entirely attributable to this fingerprint. Cost per block did not move across that rise.

That is a natural experiment against the episodes recorded on 08-15 and 08-16, where cost per block tripled on block volume rising 8 to 13 percent. Here volume rises 230 percent and cost per block does not rise at all, so whatever makes an episode is not the quantity of block work.

At 660,000 blocks a call the function moves about 5.2 GB through shared buffers each time it is called.
