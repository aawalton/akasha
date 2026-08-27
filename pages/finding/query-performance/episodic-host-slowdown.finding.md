---
id: c6fba67f-47db-5692-acfe-7617ad188223
page-type-slug: finding
title: "Episodic host slowdown"
domain-slug: domain/query-performance
---

# Claim

The two `query-performance` conditions standing open on 2026-08-15 evening are not regressions in the queries they name. Both fingerprints do the same work per call they have done for ten to fourteen days, and both take about twice as long to do it. The database as a whole moves through buffers two to three times slower than usual in episodes lasting one to three hours, and a query crosses its committed baseline whenever an episode lands on it.

# Evidence

Read off `public.db_query_stats` at 22:50 UTC on 2026-08-15.

`query-baseline-breach-regression` fired 22:44:01 for queryid -3768717739081038541 at 7.1x its committed baseline mean of 449.3 ms, threshold 3x. Triage reports it PostgREST-generated on the `pgrst_source` marker, so product code, calling `public.page_hard_delete`. It is long-standingly bimodal: most calls touch 10 to 30 shared blocks, a heavy mode over 50,000. Restricted to that heavy mode, per day across the thirteen days to 08-14, blocks per call ran 71,900 to 79,113, ms per call 578 to 755, and ms per 1,000 blocks 7.66 to 10.36. On 08-15: 72,014 blocks per call, 1,251.9 ms per call, 17.08 ms per 1,000 blocks.

`query-plan-drift-regression` fired 22:30:59 for queryid 6396909959997071872 and still stands. Across the ten days to 08-14, blocks per call ran 524 to 614 and ms per 1,000 blocks 7.77 to 10.89. On 08-15: 746 and 18.69.

Database-wide over every fingerprint, ms per 1,000 shared blocks by hour held 3.44 to 5.85 through 08-14 and the first half of 08-15, then rose in episodes: 11.47 at 12:00, 14.74 at 13:00, 4.98 and 5.11 at 14:00 and 15:00, 12.00 at 16:00, 15.36 at 17:00, 10.30 at 18:00, 5.66 and 4.59 and 4.61 from 19:00 to 21:00, 8.18 at 22:00. Both open conditions fired inside the 22:00 episode.

Arriving work does not account for it. At 15:00 the database served 2,864,480 calls over 127,266,553 blocks in 650 seconds; at 17:00, 2,549,380 calls over 137,942,797 blocks in 2,119 seconds — 8% more blocks for 3.3x the time. `track_io_timing` is off on this server, so `blk_read_time_ms` reads 0.0 for every fingerprint at all times and says nothing about disk either way. Whether disk accounts for it is not established here.

A `container-oom-killed` condition fired at 22:10:57, inside the 22:00 episode. It is not a `query-performance` condition and was not investigated here.
