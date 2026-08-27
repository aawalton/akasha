---
id: 25ed4122-ceb1-5e52-ad8b-dbc676ab82c4
slug: window-shorter-than-tick-overreads
page-type-slug: finding
title: "Window shorter than tick overreads"
domain-slug: domain/resource-utilization
---

# Claim

A busy-time-over-window reading taken from `worker.loop_duration_ms` reads above 100% where one tick is longer than the window. The row is stamped when the tick finishes and carries its whole duration, so all of it lands in the window containing the completion rather than being spread across the windows it ran through.

# Evidence

Raised by the seat delivering #18370 and confirmed by the lead against the deployed system. Over one hour the longest single tick per worker was: `agents-pacing` 426.7s, `main-pipeline-creator` 220.7s, `merge-queue-coordinator` 173.7s. A four-minute window covering the first of those reads about 178% for reasons that are not load.

`domains/resource-utilization.md` says a daemon's utilization is its busy time over elapsed time and says nothing about how long the window must be. So the reading is correct at some window lengths and wrong at others, with nothing recording which.

What was not measured: how far this reaches beyond the three workers named. The maximum was taken per worker over one hour, so a longer tick outside that hour would not appear, and no sweep was made of how often a tick exceeds a window anyone actually reads at.

Not a defect in #18370, which measured a worker whose ticks average 65.7ms against a maximum of 2.9s. The claim is about how any reader may take the reading.
