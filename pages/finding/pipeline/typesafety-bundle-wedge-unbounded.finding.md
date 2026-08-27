---
id: f62237f9-446a-5d80-94b3-6dc780e5677a
slug: typesafety-bundle-wedge-unbounded
page-type-slug: finding
title: "Typesafety bundle wedge unbounded"
domain-slug: page-type/pipeline
---

# Claim

The `check-typesafety-bundle-temper-rest` wedge (root cause #16189, uncharacterized beyond a userspace syscall-spin fingerprint) has no timeout, so its outage duration is bounded only by operator attention rather than by any mechanism: two incidents ran 31 min (pipeline 26146) and 64 min (pipeline 26190), both ended only when a human noticed, and the second was longer solely because it started at 06:00 instead of 04:00, not because the wedge itself worsened.

# Evidence

From project #16433 (domain `pipeline`). Never carried an objective — this is its capture.

Every minute is paid by the whole fleet: the merge queue cannot advance past a running step, so this wedge starved 7 queued entries for 65 minutes and the bisection then ejected an innocent entry, related project #16431.

Measured, 7 days of successful steps (status in completed/passed, soft-deletes excluded): ALL STEPS n=68210, p50 2.6s, p95 56.4s, p99 156.1s, max 924.2s (15.4m). typesafety-bundle family per shard (n, p50, p95, max): shared 645/49.7s/279.8s/414.8s; apps 643/38.6s/271.0s/408.6s; temper-rest 642/54.5s/249.9s/376.2s; temper-game 654/38.8s/175.5s/272.1s; infra 648/29.2s/151.2s/269.2s. The shorter wedge (1860s) is 4.5x the observed family max (415s) across 3232 observations.

Correction of two numbers in circulation: an incident report described siblings as "each finished in ~1m" — that is the median (29-55s), not the range (p95 151-280s, tail to 415s). A 2-min timeout sized off "~1m" would false-positive on p95 traffic; a `2x p95` rule gives ~8.3min for temper-rest, only 1.2x observed max.

Self-correction noted in the row: an earlier `2x p95` sizing used n=12 with zero in-sample exceedances, which the construction guaranteed; the n=68210/n=642-654 measurements above replace it.

A detector already exists and is already tuned but does not watch where the merge queue runs: `classifyMainPipelineOverrun` (devops-monitor/src/wedges/main-pipeline-overrun.ts) fires on a 15-minute budget for non-terminal pipelines, pure/deterministic on `snapshot.snapshotAt`, re-tuned 600s->900s on 2026-07-02 after a 7-day window put p99 at 788s. Capture cut at a paragraph boundary; this is its head.

Interaction with #16431: a timeout failure is still a step failure and alone would still eject the innocent entry, just sooner — the two are complementary, neither substitutes for the other.
