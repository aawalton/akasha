export const CLUSTER_DEEP_ALERTS = `      # HA replication lag on the CNPG physical replica(s), protecting the
      # failover RPO. Scoped to application_name=~"postgres-cnpg-.*" so it watches
      # only the CNPG streaming replicas and NOT the logical CDC consumers
      # (supabase realtime) that legitimately lag under load. Measured
      # in seconds as time-since-last-reply: pg_replication_lag_seconds reads 0
      # here because the standalone exporter connects to the PRIMARY (rw service),
      # so it cannot see downstream lag — pg_stat_replication_reply_time is the
      # primary's own view of each replica. >300s of silence means a replica is
      # disconnected or badly behind and promoting it would lose >5m of writes.
      - alert: PostgresReplicationLag
        expr: (time() - pg_stat_replication_reply_time{application_name=~"postgres-cnpg-.*"}) > 300
        for: 5m
        labels:
          severity: warning

      # SeaweedFS object-store data disk on node-04 (the Talos user volume at
      # /var/mnt/seaweedfs — kubelet DiskPressure watches only ephemeral
      # storage, so this mount needs its own rules). Replaces the k3s-era
      # BulkStorageHigh rule on /mnt/bulk, a mountpoint that no longer exists
      # on any node (#14141). Alert-only, no remediation: this store carries
      # Postgres backups (WAL archiving breaks if the cnpg bucket ever flips
      # read-only), so these must fire well before any bucket quota bites.
      - alert: SeaweedfsStorageHigh
        expr: (node_filesystem_avail_bytes{mountpoint="/var/mnt/seaweedfs"} / node_filesystem_size_bytes{mountpoint="/var/mnt/seaweedfs"}) * 100 < 20
        for: 5m
        labels:
          severity: warning

      - alert: SeaweedfsStorageRunwayShort
        expr: predict_linear(node_filesystem_avail_bytes{mountpoint="/var/mnt/seaweedfs"}[7d], 7*24*3600) < 0
        for: 1h
        labels:
          severity: warning

      - alert: FilesystemPredictedFull
        expr: predict_linear(node_filesystem_avail_bytes{fstype=~"ext4|xfs",tier!="personal"}[7d], 7*24*3600) < 0
        for: 1h
        labels:
          severity: warning

      # Ratio rules carry an absolute floor. The pure ratio (1d rate > 2x the
      # positive 7d average) has no magnitude sense, so a static database
      # drifting at millibytes/sec satisfies it as readily as a real spike —
      # template1 (7.7MB, static) false-fired at 1.6 mB/s (#14410). The
      # > 10 * 1000 (10 kB/s) floor is measured from the live
      # pg_database_size_bytes deriv distribution: static templates drift at
      # <0.01 B/s while real DBs grow at tens of kB/s (postgres/schema_baseline
      # peak ~24-31 kB/s), so 10 kB/s sits ~6 orders above the noise yet below
      # genuine growth — a real 2x ingestion spike still clears it and fires.
      - alert: PostgresStorageGrowthAnomaly
        expr: deriv(pg_database_size_bytes[7d]) > 0 and deriv(pg_database_size_bytes[1d]) > 2 * deriv(pg_database_size_bytes[7d]) and deriv(pg_database_size_bytes[1d]) > 10 * 1000
        for: 30m
        labels:
          severity: warning

      # Backup-machinery CronJob health. The original k3s-era regexes
      # (.*pg-backup.*|.*pg-basebackup.*|.*wal-sync.*|.*backup-sync.*) matched
      # ZERO live series — silent dead alerts (#14219). Live backup CronJobs
      # are seaweedfs-backup-cnpg + seaweedfs-backup-bulk (namespace seaweedfs),
      # postgres-gfs-promoter, and postgres-annual-dump (namespace postgres);
      # the Jobs they spawn carry the cronjob name as a prefix. postgres-annual-dump
      # (#14220) is the tier-5 keep-forever annual pg_dump — a failed annual Job
      # fails loud through THIS alert (the job carries no in-process DB alert
      # path). It stays absent from BackupStale's selector below, though no
      # longer because a fixed 24h would false-fire on an annual cadence: that
      # rule now derives each CronJob's own period, which would size an annual
      # job correctly. It has never run, so it exports no last_schedule_time to
      # derive a period from, and CronJobStale plus this rule already cover it.
      - alert: BackupJobFailed
        expr: kube_job_status_failed{job_name=~"seaweedfs-backup-.*|postgres-gfs-promoter.*|postgres-annual-dump.*"} > 0
        for: 1m
        labels:
          severity: warning

      # Backup staleness against each CronJob's OWN period, derived live as
      # (next_schedule_time - last_schedule_time) — the shape CronJobStale
      # already uses. The fixed 86400s this replaces assumed a daily cadence it
      # never checked, and was wrong in both directions at once.
      # TOO LOOSE: seaweedfs-backup-cnpg runs every 15m (7,22,37,52 * * * *), so
      # 86400s let it miss 96 consecutive runs before firing — over 14d of
      # history it never fired for that CronJob at all.
      # TOO TIGHT: a CronJob running to schedule sawtooths from 0 to exactly one
      # period, and 86400s IS one period for the four daily backups here, so
      # they sat at the threshold every cycle — seaweedfs-backup-assets peaked
      # at 86,395s against 86,400s, and healthy postgres-gfs-promoter crossed it
      # for 8 consecutive minutes in 14d, past this rule's own for: 5m.
      # 1.5x rather than CronJobStale's 2x: a healthy job reaches 1.0x by
      # construction so the threshold must clear it, and at 2x a single missed
      # run never fires — right for a generic CronJob, wrong for a backup. So
      # backups are read after ONE missed run and everything else after two,
      # which is what keeps this rule distinct from its neighbour. For the
      # 15-minute job the threshold is now 1,350s rather than 86,400s.
      # The selector sits on the left only: all three kube_cronjob_* gauges
      # carry identical {namespace,cronjob} labels, so the comparison matches
      # one-to-one and drops every CronJob the left side excludes.
      - alert: BackupStale
        expr: (time() - kube_cronjob_status_last_successful_time{cronjob=~"seaweedfs-backup-.*|postgres-gfs-promoter"}) > 1.5 * (kube_cronjob_next_schedule_time - kube_cronjob_status_last_schedule_time)
        for: 5m
        labels:
          severity: warning

      # Postgres base-backup freshness, straight from the object store's point
      # of view. Two proven multi-day silent backup-failure stretches
      # (06-08→06-19 and 06-28→07-01) motivated these (#14219): the CronJob
      # rules above only see job machinery, not whether a usable backup
      # actually landed. The barman_cloud_cloudnative_pg_io_* gauge (scraped
      # from the CNPG instance pods via the 'cnpg-pods' job) is the live
      # signal under plugin-mode backups; the deprecated cnpg_collector_*
      # gauges read a dead 0 there and must not be used.
      - alert: PostgresBaseBackupStale
        expr: time() - barman_cloud_cloudnative_pg_io_last_available_backup_timestamp > 26 * 3600
        for: 15m
        labels:
          severity: warning

      - alert: PostgresBaseBackupStaleCritical
        expr: time() - barman_cloud_cloudnative_pg_io_last_available_backup_timestamp > 50 * 3600
        for: 15m
        labels:
          severity: critical

      - alert: PostgresBackupMetricAbsent
        expr: absent(barman_cloud_cloudnative_pg_io_last_available_backup_timestamp)
        for: 30m
        labels:
          severity: warning

      - alert: PostgresWalArchivingFailing
        expr: increase(pg_stat_archiver_failed_count[15m]) > 0
        for: 15m
        labels:
          severity: warning

      - alert: PostgresWalArchivingStale
        expr: pg_stat_archiver_last_archive_age > 3600
        for: 15m
        labels:
          severity: warning

      # Metric-based leading indicators for k3s apiserver cache-desync. Source
      # is the apiserver's own /metrics registry — already scraped by the
      # 'kubernetes-nodes' job above because k3s exposes apiserver +
      # controller-manager + scheduler + kubelet + kine on a single Prometheus
      # registry served from the kubelet endpoint on the server node
      # (node-01:10250). Complements the log-based
      # K3sApiserverCacheDesyncSustained alert by surfacing earlier signals.
      # Runbook: packages/infra/k8s/docs/dr/k3s-apiserver-pods-cache-desync.md.
      - alert: K3sApiserverStorageConsistencyCheckFailed
        expr: increase(apiserver_storage_consistency_checks_total{status="failure"}[5m]) > 0
        for: 1m
        labels:
          severity: critical

      - alert: K3sApiserverWatchCacheReinitializing
        expr: increase(apiserver_watch_cache_initializations_total{resource="pods"}[15m]) > 1
        for: 1m
        labels:
          severity: warning

      - alert: K3sApiserverTerminatedWatchers
        expr: increase(apiserver_terminated_watchers_total{resource="pods"}[5m]) > 10
        for: 2m
        labels:
          severity: warning

      - alert: K3sKineRangeLatencyHigh
        expr: histogram_quantile(0.99, sum by (le, operation) (rate(etcd_request_duration_seconds_bucket{operation=~"list|listWithCount"}[5m]))) > 0.5
        for: 5m
        labels:
          severity: warning

      - alert: K3sApiserverListRequestErrors
        expr: rate(apiserver_request_total{verb="LIST",code=~"5.."}[5m]) > 0
        for: 2m
        labels:
          severity: warning
`
