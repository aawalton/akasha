---
id: 290bc28f-82c7-5139-b676-40a0d2c6c8cb
page-type-slug: finding
title: "Deploy expectation cost step recurs"
domain-slug: domain/pages-system
---

# Claim

The app-deploy-expectation query steps to 2,000x its normal cost for a day at a time, and has done it twice.

`loadLatestAppDeployExpectationsPg` runs once a minute. From 2026-08-08 12:00 UTC to 2026-08-09 12:00 it cost ~2,100ms and ~620,000 blocks a call, against 1.4ms and 315 blocks before and ~4ms and ~650 since. Its alert fired on a 25-hour episode the day before that. Neither the query nor its caller was committed to across either window.

# Evidence

Measured 2026-08-09 17:00 and 19:10 UTC, read-only.

Two episodes of `QuerySustainedMeanBudgetExceeded` on fingerprint 3095893069018364090: fired 2026-08-07 04:53 at 576ms, resolved 2026-08-08 06:07; fired 2026-08-08 12:57 at 532ms, resolved 2026-08-09 16:56. Both were written to `public.messages` on time; the second reached this seat three days late, which is its own finding.

Hourly from `db_query_stats`, ms and blocks per call:

  to 08-08 11:00      1.4ms      315
  08-08 12:00       337.4ms  134,239
  08-08 13:00 to 08-09 11:00, 23 hours, all between 1810 and 2437ms and between 569,233 and 695,167 blocks
  08-09 12:00        55.8ms   16,794
  08-09 13:00 on    3.3-6.7ms   640-881

That matches the second episode to the hour, and about an hour of database time went into it. Calls held at 56 to 59 an hour throughout, so this is work per call, not volume.

The query is at `packages/shared/pages/access/src/pg/load-latest-app-deploy-expectations.ts:64`, its caller `packages/agents/devops-monitor/src/snapshot/app-deploy-expectations.ts:101`, passing five workflow names and four statuses. `git log --since=2026-08-01` on both returns nothing, so the code did not change across either step.

The shape that permits it is `ORDER BY p.seq DESC LIMIT 1` inside a LATERAL, once per name: the planner walks main pipelines newest-first and stops at the first workflow match, so cost is set by how far back the first match sits.

`last_autoanalyze` on `pages` is 2026-08-09 12:01:15, inside the recovery hour. Only the most recent is retained, so neither onset can be checked that way.

Not established: the cause. Code is ruled out; a statistics flip and a change in how far back the first match sat both remain, and the autoanalyze timestamp is consistent with the first without being evidence for it. `audhdalan-web` is absent from pipelines 27432 onward, but it was present throughout the second episode and went missing as cost fell, so it is not the driver.
