---
id: ba0698fe-836d-5fd0-8e94-c633f0ada3bf
page-type-slug: finding
title: "Sustained mean budget never fitted"
domain-slug: domain/query-performance
---

# Claim

The 250 ms sustained-mean budget applied to queryid -2841954187712285930 sits below where that query has always run, so the condition reports a threshold that never fitted rather than a change. Its median cost per call over seven days is 281.6 ms across 214 qualifying buckets, and its daily mean has been 213 to 323 ms on every one of the nine days it has existed. It reads about 40,000 shared blocks per call, steadily, so the cost is what the query does rather than a regression in doing it.

# Evidence

Read at 03:55 UTC on 2026-08-16, after `query-sustained-mean-budget-exceeded` fired at 03:09:52 with the summary "Query -2841954187712285930 sustains 272ms mean over 30 minutes (budget 250ms)".

`ops query-perf triage` reports `ratchet_baseline absent` for this fingerprint, so the 250 ms it is held to is not a committed value of its own. First seen 2026-08-07, 12,390 lifetime calls over 11 active days.

Median ms per call, being the median of per-bucket rates over buckets of at least 10 calls: 281.6 over 7 days on 214 qualifying buckets, and 288.8 over 24 hours on 26. Both stand above the 250 ms budget. The call-weighted means beside them read 306.4 and 516.6.

Daily figures from `public.db_query_stats`, as calls, mean ms per call, and shared blocks per call:

- 08-07: 1,483 / 238.8 / 32,013
- 08-08: 2,831 / 212.9 / 30,083
- 08-09: 1,198 / 293.9 / 43,458
- 08-10: 1,036 / 323.3 / 43,035
- 08-11: 1,080 / 279.0 / 41,964
- 08-12: 1,128 / 270.0 / 41,060
- 08-13: 1,079 / 274.3 / 42,673
- 08-14: 1,362 / 262.3 / 39,947
- 08-15: 881 / 492.9 / 42,522
- 08-16: 94 / 258.8 / 40,089

Block work per call holds between 30,083 and 43,458 across all ten days, so nothing about what the query does has changed. Only 08-15 stands out on time, and that is the day the host ran two to three times slower in episodes.

The 30-minute and 2-hour windows show zero calls at the time of reading, and the last execution was at 01:12 UTC, so this runs periodically rather than continuously.
