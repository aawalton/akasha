---
id: 19812576-a956-56ee-b79d-6fab90a958cf
page-type-slug: finding
title: "Backup stale ignores its own period"
domain-slug: domain/global
---

# Claim

`BackupStale` treats every backup cronjob as daily — a fixed 86400 seconds since last success — while each cronjob's own period is already measured. `seaweedfs-backup-cnpg` runs every 15 minutes, so it can miss 96 consecutive runs before this fires. `CronJobStale`, in the same rule file, already derives the period per object as `2 * (kube_cronjob_next_schedule_time - kube_cronjob_status_last_schedule_time)`.

# Evidence

Measured 2026-08-13 against the live cluster, read-only, while surveying the 73 alerting rules for fixed constants standing in for per-object measurements.

THE RULE. `time() - kube_cronjob_status_last_successful_time{cronjob=~"seaweedfs-backup-.*|postgres-gfs-promoter"} > 86400`, `for: 300`, in group `cluster-alerts`.

THE FIVE IT SELECTS, with each one's own period read from `kube_cronjob_next_schedule_time - kube_cronjob_status_last_schedule_time`:

    seaweedfs-backup-cnpg        0.25h   (7,22,37,52 * * * *)
    seaweedfs-backup-bulk       24.00h   (40 4 * * *)
    seaweedfs-backup-assets     24.00h   (5 5 * * *)
    seaweedfs-backup-longtail   24.00h   (17 4 * * *)
    postgres-gfs-promoter       24.00h   (17 2 * * *)

So the constant is right for four and wrong by a factor of 96 for the fifth. For the four daily ones it also sits at exactly one period, so a single missed run reaches the threshold only as the next is due.

THE MEASUREMENT EXISTS AND IS ALREADY USED THIS WAY. `kube_cronjob_next_schedule_time` carries 23 series and `kube_cronjob_status_last_schedule_time` 22. `CronJobStale`, in the same group, is `(time() - kube_cronjob_status_last_successful_time) > 2 * (kube_cronjob_next_schedule_time - kube_cronjob_status_last_schedule_time)` — the per-object form, one rule away.

NOT THE ONLY GUARD. `CronJobStale` carries no cronjob selector, so it covers these five as well and would catch a stalled `seaweedfs-backup-cnpg` at about 30 minutes. `BackupJobFailed` covers an outright failure. So what `BackupStale` adds over its neighbour for that cronjob is nothing, at 96 times the latency.

NOT ESTABLISHED. Why the two rules exist separately; `BackupStale` may predate `CronJobStale`. Whether the 24-hour figure was chosen for the daily jobs and the 15-minute one added to the selector later.
