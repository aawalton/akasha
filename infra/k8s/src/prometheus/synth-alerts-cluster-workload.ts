export const CLUSTER_WORKLOAD_RULES = `      - alert: DeploymentReplicasMismatch
        expr: kube_deployment_spec_replicas != kube_deployment_status_available_replicas
        for: 5m
        labels:
          severity: warning

      # StatefulSet-shaped workloads sit in a coverage hole: DeploymentReplicasMismatch
      # above only watches Deployments, so a StatefulSet stuck with fewer ready
      # replicas than desired (headscale today; any future StatefulSet) was
      # silent. Catches the CLASS via the same ready!=desired shape. CNPG
      # instances are operator-managed pods, NOT a StatefulSet, so they are
      # covered by the pod/replica alerts, not this one.
      - alert: StatefulSetReplicasMismatch
        expr: kube_statefulset_status_replicas_ready != kube_statefulset_replicas
        for: 5m
        labels:
          severity: warning

      - alert: GPUTemperatureHigh
        expr: DCGM_FI_DEV_GPU_TEMP > 85
        for: 5m
        labels:
          severity: critical

      # Pods stuck Pending — the scheduler cannot place them (unschedulable) or a
      # volume never binds. A 28-day-old Pending PVC-blocked pod sat silently in
      # the audit that motivated this rule (#14276): nothing watched the Pending
      # phase before. kube_pod_status_phase emits one series per pod per phase;
      # ==1 selects only the pods actually in Pending. 15m clears normal
      # scheduling/pull latency so only genuinely-stuck pods fire.
      - alert: PodPending
        expr: kube_pod_status_phase{phase="Pending"} == 1
        for: 15m
        labels:
          severity: warning

      # Generic Job-failure alert — catches the CLASS across all namespaces, so a
      # failing Job no longer needs to be on a hand-maintained allowlist to be
      # seen (the #14276 audit found a CronJob failing silently with no allowlist
      # entry). The tighter BackupJobFailed rule below stays as a faster (for:1m)
      # specialization for the backup Jobs. Identity is COLLAPSED to (namespace,
      # owner_name) via the kube_job_owner join: CronJob-spawned Jobs carry a
      # per-run-suffixed job_name (e.g. registry-gc-29716200), which is part of an
      # alert's identity, so a naive kube_job_status_failed>0 would mint a NEW
      # alert identity every run and re-flood (the royal-road CronJob fails
      # hourly, retaining several failed Job records). Aggregating by the stable
      # owner_name gives ONE identity per failing workload.
      # kube_job_owner has a series for every Job, so the join
      # drops nothing — the class stays fully covered, checked in #18706 by
      # failing a bare Job and watching this rule pick it up. That build emits NO
      # owner_name label at all for a bare Job (not owner_name "<none>", as this
      # note used to say), so such an alert carries a blank owner in its summary
      # and a matcher on "<none>" would select nothing.
      #
      # RECENCY, 86400s = 24h (#18706). kube_job_status_failed>0 is true of a
      # retained failed Job WHATEVER ITS AGE, so an uncollected Job object alerted
      # forever: three workloads fired on residue 34, 10.7 and 1.5 days old, each
      # having succeeded on every run since, and re-fired together on every
      # Prometheus restart. The 'and on (namespace, job_name)' guard admits only
      # Jobs whose own start time is inside the window. It sits INSIDE the
      # selector, so the owner-collapse described above is untouched.
      # Start time is the only timestamp a failed Job carries --
      # kube_job_status_completion_time is set on success only -- so the window
      # also has to cover a Job that runs a while before it fails; 24h does, and
      # spans a daily CronJob's period so a failure stays up until its next run.
      # NOT keyed off kube_cronjob_status_last_successful_time: that reaches only
      # CronJob-owned Jobs, and a CronJob that has NEVER succeeded emits no such
      # series at all, so the permanently-broken workload would go SILENT.
      # NOT cleared by a later success either: that silences the flapping
      # workloads (the hourly royal-road CronJob above) this rule exists to catch.
      # kube_job_status_failed carries a 'reason' label that
      # kube_job_status_start_time does not; the explicit 'on' clause names its
      # match labels, and the outer max by collapses per-reason series as before.
      - alert: JobFailed
        expr: max by (namespace, owner_name) (((kube_job_status_failed > 0) and on (namespace, job_name) ((time() - kube_job_status_start_time) < 86400)) * on (namespace, job_name) group_left(owner_name) kube_job_owner)
        for: 5m
        labels:
          severity: warning

      # Generic CronJob staleness with a per-schedule tolerance — a CronJob that
      # silently stops producing successful runs, for any cadence, without a
      # hand-tuned per-CronJob threshold. Tolerance = 2x the CronJob's own period,
      # derived live as (next_schedule_time - last_schedule_time): an hourly job
      # gets ~2h grace, a weekly job ~2wk, the annual pg_dump ~2yr — so infrequent
      # jobs never false-fire. BackupStale now derives its period the same way,
      # at 1.5x rather than 2x, so backups are read after one missed run and
      # everything else after two. Complements JobFailed: that catches runs that
      # run-and-fail; this catches a controller that stopped scheduling/succeeding
      # entirely. All three kube_cronjob_* series carry {namespace,cronjob} so they
      # match cleanly; a CronJob missing last_successful/last_schedule (never
      # succeeded / brand new) simply doesn't evaluate here and is caught by
      # JobFailed instead.
      - alert: CronJobStale
        expr: (time() - kube_cronjob_status_last_successful_time) > 2 * (kube_cronjob_next_schedule_time - kube_cronjob_status_last_schedule_time)
        for: 30m
        labels:
          severity: warning

      # Slow OOM-kill cycles that evade PodCrashLooping. A container OOM-killed
      # roughly once an hour restarts far too slowly to cross PodCrashLooping's
      # >5-restarts-in-10m threshold, so it churns memory silently (#14275 found
      # three such daemons). last_terminated_reason=="OOMKilled" alone would stay
      # 1 long after a one-off OOM, so it is joined with a recent restart increase
      # (>0 in the last hour) to fire only on an ACTIVE cycle. Identity is
      # (namespace, container) after the bridge drops pod/uid, so a daemon that
      # respawns pods stays ONE alert; keep_firing_for holds continuity across the
      # ~hourly gap, mirroring PodCrashLooping.
      - alert: ContainerOOMKilled
        expr: (kube_pod_container_status_last_terminated_reason{reason="OOMKilled"} == 1) and on (namespace, pod, container) (increase(kube_pod_container_status_restarts_total[1h]) > 0)
        for: 2m
        keep_firing_for: 15m
        labels:
          severity: warning

      # The LEADING indicator ContainerOOMKilled cannot be: that rule keys on
      # last_terminated_reason, so it is post-mortem by construction and the
      # container is already dead when it fires. NodeMemoryPressure does not
      # cover this either — it is node-wide, so one container filling its own
      # cgroup on a node with 40GiB free is invisible to it (#16247: Loki
      # OOM-cycled on an 82-minute period while node-02 reported no pressure).
      # Peak, not point-in-time: memory-bound workloads oscillate and are killed
      # on the spike, so the windowed max is the honest signal — Loki ran a 0.43
      # mean against a 1.0 peak on the day it died. Replayed against that
      # incident this rule crosses 0.9 at 09:44Z on a 16:16Z kill: 6.5h of lead.
      # Two guards keep it quiet. The >=512Mi floor on the LIMIT is the #14219
      # absolute-floor requirement: every container sitting stably above 0.9 is
      # sub-512Mi (node-exporter 64Mi, nvidia-device-plugin 64Mi, grafana 96Mi)
      # and hot BY DESIGN, not dying. 0.9 itself clears the loudest legitimate
      # steady state above that floor — dcgm-exporter holds a flat 24h
      # min/avg/max of 0.72/0.75/0.86 and has never been OOM-killed. Day one it
      # matches zero series; a threshold-lowered variant yields 11, so the floor
      # has not made it a can't-fire dead alert. max by (namespace, container)
      # is load-bearing, not cosmetic: cAdvisor carries id/image/name labels
      # that churn on every pod restart, and the bridge dedups on all labels
      # except pod/uid, so without the aggregation each restart mints a fresh
      # envelope.
      - alert: ContainerMemoryNearLimit
        expr: max by (namespace, container) (max_over_time(container_memory_working_set_bytes{container!="",container!="POD"}[15m]) / on (namespace, pod, container) (container_spec_memory_limit_bytes{container!="",container!="POD"} >= 536870912)) > 0.9
        for: 10m
        keep_firing_for: 30m
        labels:
          severity: warning

      # Direct node-readiness alert (vs today's indirect TargetDown proxy on the
      # node_exporter scrape). kube_node_status_condition==0 for the Ready/true
      # series means the node's Ready condition is not True — NotReady/Unknown.
      # The tier!="personal" matcher mirrors the node-threshold alerts; KSM
      # cluster nodes carry no tier label so it is a no-op today, kept for
      # consistency and to stay correct if a personal host ever joins the cluster.
      - alert: NodeNotReady
        expr: kube_node_status_condition{condition="Ready",status="true",tier!="personal"} == 0
        for: 10m
        labels:
          severity: warning
`
