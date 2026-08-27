---
id: b6857ee1-bac5-5529-b8b1-67f04a9086b0
slug: wall-clock-alerts-ship-unfired
page-type-slug: finding
title: "Wall clock alerts ship unfired"
domain-slug: domain/global
---

# Claim

Eleven of the fourteen Prometheus rules whose firing condition is wall-clock arithmetic ship with no fire proof, so nothing has ever observed their fire path execute. A rule of this shape cannot be observed to fire before its deadline actually arrives, so one that ships dead is a silently disabled instrument until the day it was supposed to save.

# Evidence

Measured 2026-08-11 on worktree `18682` at `c8570f8981`, by parsing the composed `ALERTS_YML` out of `@infra/k8s/prometheus/synth-alerts` rather than reading any list. The document holds 76 rules in 14 groups — 74 alerts and 2 recording rules — of which 14 rules match `time()` in their expression.

`check-prometheus-rules` rung 3 fire-proofs the alertnames its five fixtures under `packages/infra/checks/__fixtures__/prometheus-rule-tests` name. Those fixtures name 14 alertnames between them, of which exactly 3 are wall-clock rules: `CgroupPsiCollectorStale`, `DomainRegistrationExpiringSoon` and `DomainRegistrationExpiringCritical`.

The eleven with no fixture, by group. `cluster-alerts`: `JobFailed`, `CronJobStale`, `PostgresReplicationLag`, `BackupStale`, `PostgresBaseBackupStale`, `PostgresBaseBackupStaleCritical`. `cert-and-storage-liveness`: `CertManagerCertExpiringSoon`, `CertManagerCertExpiringCritical`. `agent-oauth-auth-health`: `ClaudeAccountTokenRefreshStalledCritical`, `ClaudeAccountTokenRefreshStalledWarning`. `kubepods-slice-oom`: `KubepodsOomCollectorStale`.

THE CLASS IS REAL AND WAS RE-REFUSED TODAY. Cutting the domain-expiry threshold from `30 * 24 * 3600` to a bare `30` — a unit slip that parses clean — passes rung 1 and is refused by rung 3, exit 1, both warning-tier assertions reading `got:[]`. The same slip in any of the eleven would merge green.

NOT MEASURED. Whether any of the eleven is in fact dead today. Nothing here evaluated them against a series; the finding is that no mechanism has.

WHY IT IS NOT A CHECK. Gating it would demand eleven authored promtool fixtures before the gate could land under Zero At Landing, and a fixture written to satisfy a gate is not one anybody judged that alert's fire path needed. Project 18619 declined to build that gate for exactly this reason and filed this instead. Each fixture is the alert owner's call, and writing one is what the surviving reasoning in the check's own header justifies.
