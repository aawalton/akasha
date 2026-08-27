---
id: f7c135df-1998-5e35-8e0b-429bde1b68be
page-type-slug: finding
title: "Alert omits its store horizon"
domain-slug: domain/instrument
---

# Claim

`JobFailed` fires on a failed job object existing, with no recency term, so a job that failed 28 days ago reads exactly like one that failed now — a breach of Horizon, which binds a reading to say how far back its store reaches. Three such alerts fired continuously for ten days while the CronJobs owning them kept succeeding. No registered mechanism refuses an unbounded store read in an alert expression, though a sibling check already refuses a different defect in the same expressions.

# Evidence

Measured 2026-08-05 against the live cluster, re-running an observation filed 2026-08-04.

Expression, `packages/infra/k8s/prometheus/synth-alerts.ts:236`: `(kube_job_status_failed > 0)` joined to `kube_job_owner`, with no recency term. Its summary reads "Job(s) owned by X failed", carrying no time qualifier, and its description directs the reader to `kubectl logs job/<failed-job>`.

The live Prometheus loads 66 alert rules; five instances were firing. `Watchdog` is an always-firing dead-man's switch, declared as such and never delivered while firing. `WorkerSupervisorCpuPressureHigh` was firing. The other three were `JobFailed` for `registry`, `pod-janitor` and `cloudflared`, all with `activeAt` 2026-07-26T07:35:13Z — ten days continuously.

At the same moment every owning CronJob was healthy: `cloudflared/ddns-headscale` (`*/5 * * * *`) had succeeded 2m20s earlier, `pod-janitor` (`0 */6 * * *`) 3h2m earlier, `registry-gc` (`0 4 * * *`) 11h earlier. The failed job objects driving the three alerts were aged 5d2h, 28d and 28d.

`domains/instrument.md` binds Horizon: say how far back a store reaches, beside any reading taken from it. The job-object store reaches as far as garbage collection left it, measured here at 28 days, and the alert states none of it.

`ops enforcement list --grep alert` returned two mechanisms: `check-alert-expr-epoch-literals`, refusing a wall-clock literal inside an alert expression, and a terminal-tint hook. Neither refuses an unbounded store read.

Population: 66 rules loaded live, whose firing state I read in full and one of whose expressions I read. The checked-in `generated/prometheus-configmap.generated.yaml` carries 51 of them and is stale against what is deployed.

Not measured: whether any of the other 65 rules share the defect, and whether keying on completion time keeps the genuine case, which on 2026-08-04 was `seaweedfs-backup-longtail` and was not firing on 2026-08-05.
