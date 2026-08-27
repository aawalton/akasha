---
id: c4d444ea-65df-53fd-aabb-1a37f7d2ec98
page-type-slug: finding
title: "Inode pressure metric never filed"
domain-slug: domain/metric
---

# Claim

#16070's ruling (2026-07-26T05:49) claimed "I have filed it" for an inode-exhaustion metric shaped as metric+Prometheus, but no such row was ever filed: worker-16437 found only #16231 and #16193, neither building a metric, and had to ask before discovering the claim false. The inode sender has never fired to athena; the sole `system:inode-pressure` row is a #16070 verification artifact with injected thresholds (WARN at 3.15% of ceiling), not a real metric.

# Evidence

From project #16442 (domain `metric`). Never carried an objective — this is its capture, moved off the row's retired `notes` attribute on 2026-08-15.

Filed late, and the lateness is the point: a verifiable claim ("I have filed it") was asserted as completed fact in a ruling another agent relied on. The failure named is not the missing row but that worker-16437 had to discover the claim was false.

Why a metric, not an alert: inode exhaustion raises ENOSPC while `df` reports tens of gigabytes free, and once a filesystem fills, every agent's writes fail at once — too fast for boot-time discovery, which a record gives. The record conversion on #16437 is a strictly-better interim (cannot interrupt a live athena, loses no latency for a dormant one) but is not the answer.

Fully precedented, per #15577's macbook-inference-probe: workstation 60s timer -> public.metrics -> postgres_exporter custom query -> Prometheus -> infra-alert-bridge -> recipient. worker-16437 sized reuse at ~6 files plus a Prometheus foundation deploy (alerts.yml is subPath-mounted, needing a rollout restart).

Deliberately not a wave-2 child: Alan's restart bar is "all senders converted," met by #16437's record conversion. This row carries a deploy dependency (Prometheus foundation rollout) and must not gate the fleet restart behind an infra deploy.

Measured (worker-16437): the inode sender has never fired to athena. The single `system:inode-pressure` row targets project-16070 and is a #16070 verification artifact (WARN at 3.15% of ceiling = injected thresholds). `~/agents/athena/inode-pressure/` does not exist — created only by a successful alert. Journal shows 0 ticks over ~109 min, a short window, not extinction.

When building: a mount with no inode ceiling reads "unmeasured," never "healthy" — pressure-unknown is never pressure-no. The guard at `inode-guard.ts:71,77,79` is bigint-typed; "no ceiling" sentinels are not all spelled 0. Prove the alert fires both verdicts first.
