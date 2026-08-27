---
id: 0612f83b-e783-5102-954f-b013bef2b77c
page-type-slug: finding
title: "New query took half the database"
domain-slug: domain/query-performance
---

# Claim

A query that had run 18 times in three weeks began running about 720 times an hour on the evening of 2026-08-15 and has not stopped since. At roughly 145,000 shared blocks a call it now accounts for 45 to 48 percent of all block traffic on the database, hour after hour. The host is absorbing it so far — cost per block today is the lowest of any day in the retained store — but it has roughly doubled the standing load and so halved the headroom before anything else tips the host into an episode.

# Evidence

Read at 11:50 UTC on 2026-08-16 for queryid 7385047770753747447, after `query-sustained-mean-budget-exceeded` fired for it at 363 ms against a 250 ms budget. `public.db_query_stats` retains this fingerprint from 2026-07-24.

Calls and shared blocks per call by day: 07-24, 16 calls at 120,950; 08-14, 2 calls at 146,942; 08-15, 3,607 calls at 144,028; 08-16 to 11:46, 8,509 calls at 145,157. Block work per call is steady across every day it has run; only the call count changed.

By hour it starts at 55 calls at 18:00 on 08-15, 345 at 19:00, 792 at 20:00, and holds between 703 and 735 calls in every hour from 00:00 to 10:00 on 08-16.

Its total block traffic against the whole database's, by hour on 08-16, in millions of shared blocks: 105.9 of 258.4 at 00:00, 105.1 of 227.5 at 02:00, 104.9 of 220.4 at 05:00, 104.8 of 213.6 at 08:00, 106.9 of 216.7 at 09:00. That is 41 to 49 percent of everything the database touched in those hours.

Database-wide totals by day, in millions of shared blocks with ms per 1,000 blocks beside them: 08-04 1,279 at 5.25; 08-07 3,738 at 7.31; 08-10 3,791 at 6.13; 08-13 2,161 at 4.48; 08-14 2,427 at 4.74; 08-15 2,940 at 7.18; 08-16 to 11:46, 2,694 at 2.79. Today's cost per block is the lowest of the thirteen days, so the host is keeping up. Today's block total over 11.8 hours works out at about 228 million an hour, against 158 million an hour on 08-10, the busiest full day retained.

This fingerprint's own ms per call reads 78.2 to 91.3 in every hour from 00:00 to 09:00, then 129.2 at 10:00 and 259.0 at 11:00, alongside the database moving from 2.13 to 3.71 to 6.93 ms per 1,000 blocks over the same three hours. The alert that fired on it is that movement, not a change in the query.
