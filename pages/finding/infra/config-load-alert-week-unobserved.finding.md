---
id: 1c0093bd-5183-5a18-b5e7-84e96cde9791
page-type-slug: finding
title: "Config load alert week unobserved"
domain-slug: domain/global
---

# Claim

`MergeQueueConfigLoadHeadroomLow` shipped in place of the retired `WorkerSupervisorCpuPressureHigh`, and whether it costs a reader a manual check is not yet measured: no working week has passed under it. The window does not start from a quiet system — at verification the trailing median stood within 8% of the alert's own threshold and two config loads had reached the cap in the preceding 24 hours, so a firing during the window is likely and is the test rather than a fault.

# Evidence

The one criterion of project 18350 that no instrument could settle on demand, recorded here so it survives the project being closed.

VERIFIED 2026-08-10 20:30Z, by running the instruments rather than reading the delivering seat's account. Prometheus stands at 72 rules across 13 groups. `WorkerSupervisorCpuPressureHigh` and `WorkerSupervisorCpuPressureMetricAbsent` both resolve to nothing. `CgroupPsiCollectorStale` is present and healthy. `MergeQueueConfigLoadHeadroomLow` is present in group `merge-queue-config-load`, `health: ok`, `state: inactive`, expression `max(merge_queue_config_load_median_ms) >= 105000 and max(merge_queue_config_load_sample_count) >= 3`.

Both exporter series resolve. At one instant Prometheus read count 16 and median 97500.09447150026ms; the same trailing-3h window computed off `public.metrics` for `merge_queue_coordinator.staging_prep_duration_ms` at `labels->>'operation' = 'load_configs'` returned 16 and 97500.1. The selector is armed rather than silently empty: at 105000 it returns nothing, and with the threshold lowered it returns one result with an empty label set.

OUTSTANDING. The criterion reads: a working week passes in which no firing of this family needed a reader to check the merge queue by hand before deciding it was noise. Nothing run today settles it.

WHAT WOULD FAIL IT. A firing that a reader has to take to `ops merge-queue show` to conclude was noise. At verification the trailing median was 95038.55ms over 17 samples against the 105000ms threshold, and 2 of the 39 `load_configs` in the preceding 24 hours reached the 150000ms cap, worst 150334.7ms.

NOT MEASURED. Whether it has fired since. Whether the median key leaves a class of stall unwatched in practice rather than in replay — the shipped SQL replayed across 2026-07-09..2026-08-10 fired on exactly two days, both real events, but a replay cannot show what a reader would do with a page.
