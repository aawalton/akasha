import { S3_BUCKET, S3_ENDPOINT } from "../loki-constants/loki-constants.module.code.ts"

export const LOKI_CONFIG = `auth_enabled: false

server:
  http_listen_port: 3100
  log_level: warn

common:
  ring:
    instance_addr: 127.0.0.1
    kvstore:
      store: inmemory
  replication_factor: 1
  path_prefix: /loki
  storage:
    s3:
      endpoint: ${S3_ENDPOINT}
      bucketnames: ${S3_BUCKET}
      access_key_id: \${LOKI_S3_ACCESS_KEY}
      secret_access_key: \${LOKI_S3_SECRET_KEY}
      s3forcepathstyle: true
      insecure: true
      region: us-east-1

schema_config:
  configs:
    - from: "2024-01-01"
      store: tsdb
      object_store: s3
      schema: v13
      index:
        prefix: index_
        period: 24h

limits_config:
  retention_period: 168h
  max_query_series: 500
  max_query_parallelism: 2
  # Raised from the 4 MB/s / 6 MB-burst default. With Promtail tailing
  # terminal-phase pods on the CI dispatching node (node-06), the default
  # cap was being hit continuously and produced HTTP 429 back-pressure
  # that destabilized Promtail. 16 MB/s sustained × ~1s batchwait stays
  # well inside Loki's 2Gi memory budget on node-02.
  ingestion_rate_mb: 16
  ingestion_burst_size_mb: 32

compactor:
  working_directory: /loki/compactor
  compaction_interval: 10m
  retention_enabled: true
  retention_delete_delay: 2h
  delete_request_store: s3
`

export const PROMTAIL_CONFIG = `server:
  http_listen_port: 3101
  log_level: warn

positions:
  filename: /var/lib/promtail/positions.yaml

clients:
  - url: http://loki.loki.svc.cluster.local:3100/loki/api/v1/push

scrape_configs:
  - job_name: kubernetes-pods
    kubernetes_sd_configs:
      - role: pod
    pipeline_stages:
      - cri: {}
    relabel_configs:
      # Required: map node name to __host__ so Promtail only tails local pods
      - source_labels: [__meta_kubernetes_pod_node_name]
        target_label: __host__
      # No phase filter: terminal-phase pods must remain tailable so a
      # pod that transitions Pending→Running→Succeeded faster than the
      # 10s SD refresh is still scraped. The kubelet GCs the underlying
      # log file on its own schedule; the tailer cleanly drops the
      # target on "file does not exist". See ../CLAUDE.md for the
      # measurement and rationale.
      # Use namespace/pod/container as labels
      - source_labels: [__meta_kubernetes_namespace]
        target_label: namespace
      - source_labels: [__meta_kubernetes_pod_name]
        target_label: pod
      - source_labels: [__meta_kubernetes_pod_container_name]
        target_label: container
      # Use pod labels for app identification
      - source_labels: [__meta_kubernetes_pod_label_app_kubernetes_io_name]
        target_label: app
      - source_labels: [__meta_kubernetes_pod_label_app_kubernetes_io_part_of]
        target_label: part_of
      # Pipeline engine step labels
      - source_labels: [__meta_kubernetes_pod_label_pipeline_engine_workflow]
        target_label: pipeline_workflow
      - source_labels: [__meta_kubernetes_pod_label_pipeline_engine_step]
        target_label: pipeline_step
      - source_labels: [__meta_kubernetes_pod_label_pipeline_engine_sha]
        target_label: pipeline_sha
      # Set log file path
      - source_labels:
          - __meta_kubernetes_pod_uid
          - __meta_kubernetes_pod_container_name
        target_label: __path__
        separator: /
        replacement: /var/log/pods/*$1/*.log

  # Node kernel ring buffer, as persisted by Talos to /var/log/kernel.log.
  #
  # Talos runs no journald, so the node-journal job this replaces read an
  # empty directory and produced zero streams for its entire lifetime.
  #
  # The kernel log is the only place the OOM constraint token appears —
  # oom-kill:constraint=CONSTRAINT_MEMCG (container hit its own limit)
  # vs CONSTRAINT_NONE (node reclaim killed a container within its
  # limit). Those two predict opposite fixes and are indistinguishable in
  # kubelet output, which reports exit 137 + OOMKilled for both. The same
  # line also carries the victim's terminal anon-rss, which a sampled
  # gauge cannot observe: an OOM kill is the tail of a spike between
  # scrapes, so every peak derived from cAdvisor is a lower bound.
  #
  # __host__ pins each DaemonSet pod to its own node's file: Promtail
  # drops targets whose __host__ is not its own hostname, and the
  # DaemonSet sets HOSTNAME from spec.nodeName. This is the same
  # mechanism the kubernetes-pods job above uses. Do NOT reach for
  # -config.expand-env=true to interpolate a node name instead — it
  # runs os.Expand over this file's raw text before parsing, which would
  # expand the $1 in the pod __path__ above to empty and silently
  # break all pod-log collection.
  - job_name: node-kernel
    kubernetes_sd_configs:
      - role: node
    relabel_configs:
      - source_labels: [__meta_kubernetes_node_name]
        target_label: __host__
      - source_labels: [__meta_kubernetes_node_name]
        target_label: node
      - target_label: job
        replacement: node-kernel
      - target_label: __path__
        replacement: /host/var/log/kernel.log
    pipeline_stages:
      # Stamp each entry with the KERNEL's own timestamp, never the time
      # Promtail happened to read it. A collector that stalls and then
      # flushes produces dense, contiguous ingest timestamps across a
      # capture gap — so a coverage window computed from ingest time
      # reads clean over the exact outage it needs to disclose.
      # NOTE: this file is a TS template literal, so every backslash in the
      # emitted YAML must be doubled here. An un-doubled \\w reaches Promtail
      # as a literal w, the stage then matches nothing, and action_on_failure
      # silently fudges EVERY entry's timestamp — records keep arriving and
      # the coverage window this job exists to make honest becomes fiction.
      # Verify against generated/promtail-configmap.generated.yaml, never
      # against this source.
      - regex:
          expression: '^\\w+:\\s+\\w+:\\s+\\[(?P<kernel_ts>[^\\]]+)\\]:'
      - timestamp:
          source: kernel_ts
          format: RFC3339Nano
          action_on_failure: fudge
`
