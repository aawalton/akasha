---
id: 4e167d0e-200a-5b9f-af0e-88d439eb0f2b
slug: conditions-stand-after-metric-recovers
page-type-slug: finding
title: "Conditions stand after metric recovers"
domain-slug: domain/query-performance
---

# Claim

A `query-sustained-mean-budget-exceeded` condition can stand for hours after the thing it measures has returned well under its threshold. One has stood since 11:46 while the query it names ran 348 times in each 30-minute window since, at means of 118 to 123 ms against a 250 ms budget. That query is present and running steadily, so this is not the series going absent. The five drift conditions that fired in the same burst all cleared together at 13:46, about two hours after firing.

# Evidence

Read at 13:47 UTC on 2026-08-16.

Seven conditions fired between 11:31:21 and 11:54:24 on 2026-08-16, across seven unrelated fingerprints, during a host episode in which database-wide cost per block went from 2.13 ms per 1,000 shared blocks at 09:00 to 6.90 at 11:00. The host returned to 2.11 at 12:00 and 2.01 at 13:00.

Queryids 7984240067769200172 and -141607114146020044 cleared before 13:47. The remaining five drift conditions all cleared together at 13:46:30, between 115 and 135 minutes after firing, so the drift path clears on a lag rather than sticking.

The clearest of the five is `query-sustained-mean-budget-exceeded` for queryid 7385047770753747447, fired 11:46:23 with the summary "sustains 363ms mean over 30 minutes (budget 250ms)". Over the 30 minutes to 13:47 that fingerprint made 348 calls at a mean of 118.5 ms and 148,431 shared blocks per call, and over the 30 minutes to 14:02, 348 calls at 122.8 ms. It was still standing at 14:02, two hours and sixteen minutes after firing. It is running steadily at around 700 calls an hour and has been all day, so nothing about it has gone absent.

Five of the other fingerprints that fired in the burst did stop running, last executing between 11:44 and 11:50, and an earlier pair on the same day fired at 03:39 and cleared at 05:15 with no calls in between — about 95 minutes on the absence path. That path does not explain a fingerprint still executing.

The exporter caches its result for 600 seconds, which is a twelfth of the time this condition has stood.

These figures reconstruct the metric from `public.db_query_stats` rather than reading what the exporter published, so they establish that the underlying quantity is under budget rather than that the published series was.
