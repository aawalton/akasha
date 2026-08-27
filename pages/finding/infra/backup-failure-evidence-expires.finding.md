---
id: 0fda48ba-81db-5892-94d0-0028a0eca3d7
slug: backup-failure-evidence-expires
page-type-slug: finding
title: "Backup failure evidence expires"
domain-slug: domain/global
---

# Claim

A backup CronJob that fails destroys the evidence of its own failure before anyone can read it. Pod garbage collection is keyed to the job finishing while the alerts that report the failure are keyed to a staleness window measured in days, so by the time a human or an agent is told a backup is failing, the logs that would say why no longer exist.

# Evidence

Measured 2026-08-04 against the live cluster.

`seaweedfs-backup-bulk` sets `ttlSecondsAfterFinished: 3600` on a job scheduled `40 4 * * *`. `seaweedfs-backup-longtail` sets `86400` on a job scheduled `17 4 * * *`.

The alerts that report the condition are `BackupStale` (fires after 24h without success) and `CronJobStale` (fires at twice the schedule period). Both windows are longer than the bulk TTL.

Bulk last succeeded 2026-07-28T04:45:53Z and had failed on every run since; no job object and no pod for any of those runs still existed on 2026-08-04, so `kubectl logs` could return nothing for any of them. The `kube_job_status_failed` series in Prometheus retained only one of the seven, because the series lives only while the job object does and the scrape interval is coarser than the object's lifetime.

Longtail's failed job object survived (24h TTL) but its pod did not, so the job's conditions gave `BackoffLimitExceeded` and no error text.

The longtail cause was recovered only by re-running the job's own pod spec by hand, first with `DRY_RUN=1` and then for real. Nothing in the cluster held it.

Not measured: whether any log shipper (Loki is deployed) retained these pods' stdout independently of the pod lifetime, which would weaken the claim; and whether the TTLs were set deliberately against disk pressure on node-06.
