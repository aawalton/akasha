export const CLUSTER_NODE_RULES = `      - alert: PodCrashLooping
        expr: increase(kube_pod_container_status_restarts_total[10m]) > 5
        for: 1m
        # Hold one continuous firing state through a full CrashLoopBackOff
        # cycle. The 10m-increase dips below 5 as backoff spacing grows (a
        # looping pod restarts less often once backoff stretches to minutes),
        # so without this the alert flap-resolves while the pod is still
        # crash-looping (observed #14219: fired 22:56Z, flap-resolved 22:58Z
        # mid-loop). keep_firing_for keeps it firing for 15m past the last
        # threshold breach, longer than the backoff gap, so one loop = one alert.
        keep_firing_for: 15m
        labels:
          severity: warning

      # Generic scrape-health alert: any target Prometheus cannot scrape reads
      # up==0, and before this rule a dead target was completely invisible — the
      # cloudflared target sat up==0 through the blackhole era with nothing
      # screaming (#14241). Catches the CLASS (any dead scrape target), not one
      # instance. Personal hosts (workstation/macbook, tier=personal) are
      # excluded: they sleep, so their up flips to 0 nightly by design — paging
      # on that would train blindness. The != matcher also keeps every real
      # infra target, which carries no tier label.
      - alert: TargetDown
        expr: up{tier!="personal"} == 0
        for: 10m
        labels:
          severity: warning

      - alert: NodeMemoryPressure
        expr: (node_memory_MemAvailable_bytes{tier!="personal"} / node_memory_MemTotal_bytes{tier!="personal"}) * 100 < 10
        for: 5m
        labels:
          severity: critical

      - alert: NodeDiskPressure
        expr: (node_filesystem_avail_bytes{mountpoint="/",tier!="personal"} / node_filesystem_size_bytes{mountpoint="/",tier!="personal"}) * 100 < 15
        for: 5m
        labels:
          severity: warning

      # PSI 'some' for CPU: the fraction of wall time at least one task was
      # runnable but waiting on a core. Deliberately a LOOSE PROXY, and the only
      # CPU-pressure alert there is — the per-pod tripwire that used to sit
      # beside it in the cgroup-psi group was retired by #18350 in favour of a
      # headroom watch on the merge-queue coordinator's config-load durations,
      # and that watch went with the merge queue itself. NOTHING NOW WATCHES THE
      # PER-POD CONDITION. The per-pod SERIES is still collected (#16327) and is
      # still the right thing to query by hand for attribution; what went was
      # every threshold on it. This node-level series is broader — it covers
      # every node and every workload, including the ones the per-pod collector
      # age-gates out, and it needs no join to be meaningful — but it cannot
      # attribute, so it does not replace what was retired.
      #
      # NOT pinned to a named node, on purpose. Scoping it to whichever node hosts
      # worker-supervisor today would be a threshold whose premise rots silently
      # the moment placement changes — the exact defect class it exists to catch.
      # Any node sustaining this much contention is worth a look.
      #
      # IT CANNOT ATTRIBUTE TO A CONTAINER. Node-wide contention moves for reasons
      # unrelated to any one cgroup, so a quiet reading here is NOT evidence that a
      # particular pod is healthy.
      #
      # Threshold measured rather than chosen (2026-07-25): quiet nodes 0.003-0.035;
      # node-06 under worker-supervisor + CI co-tenancy 0.20, 90m peak 0.299;
      # node-05 while starving the merge-queue coordinator that ejected #16240
      # peaked at 0.849. 0.5 sits ~1.7x above busy-but-healthy and ~1.7x below
      # proven-bad, and fires nothing at rest. 10m because this quantity is a spiky
      # band, not a level — it moved 72% of a node inside four minutes that night.
      - alert: NodeCpuPressureHigh
        expr: rate(node_pressure_cpu_waiting_seconds_total{tier!="personal"}[5m]) > 0.5
        for: 10m
        labels:
          severity: warning

      # Absent-metric guard for the PSI path (mirrors CertManagerCertExpiryMetricAbsent).
      # node_pressure_* is Linux-only and comes from the same node-exporter scrape as
      # the memory/disk thresholds; if it drops, NodeCpuPressureHigh goes silently
      # blind rather than quiet-because-healthy.
      - alert: NodeCpuPressureMetricAbsent
        expr: absent(node_pressure_cpu_waiting_seconds_total)
        for: 30m
        labels:
          severity: warning

      - alert: PostgresDown
        expr: pg_up == 0
        for: 1m
        labels:
          severity: critical

      # Connection saturation against the server's OWN max_connections, which
      # the postgres-exporter already scrapes and no rule read until now — the
      # Grafana postgres dashboard has shown percent-of-max all along, so the
      # measure existed and only the alert was not using it.
      # The fixed 250 this replaces was compared against a gauge carrying one
      # series per {datname,state,usename} — 36 live, largest 180 — so the rule
      # asked whether any single BUCKET passed 250, never whether the server
      # was running out of connections. Every bucket can sit far under 250
      # while the server refuses the next connection. Measured live: the sum is
      # 233 of 500, and over 30d it reached 273 while no bucket passed 180.
      # The on (server) clause is load-bearing. max_connections carries
      # {instance,job} which sum by (server) has dropped, so the default
      # matcher pairs nothing and the expression returns ZERO ROWS FOREVER — a
      # permanently empty rule is indistinguishable from a healthy server,
      # which is the exact failure this repair exists to remove. Verified live
      # that the joined form returns a row and the unjoined form returns none.
      # 0.75 and for: 2m (down from 5m) are ONE decision, not two. Over 30d
      # at 60s resolution the sum peaked at 273 (0.546 of cap), so 375 sits
      # 1.37x above the observed peak and stays quiet; the fastest sustained
      # ramp measured is 21.8 conn/min. At 0.8 the cap is 4.6 min past the
      # threshold — less than a 5m hold — so the server would exhaust before
      # the alert could fire, leaving a rule that cannot speak on the case it
      # exists for. At 0.75 with a 2m hold it fires with ~81 slots and ~3.7 min
      # still in hand. Evaluation interval is 30s, so 2m is four evaluations.
      # Ratio form rather than count form so $value is the fraction of this
      # server's own cap: a raw count cannot say how near the limit it is,
      # which is the whole point of the repair.
      - alert: PostgresHighConnections
        expr: sum by (server) (pg_stat_activity_count) / on (server) pg_settings_max_connections > 0.75
        for: 2m
        labels:
          severity: warning

`
