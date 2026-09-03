export const PROMETHEUS_YML = `global:
  scrape_interval: 30s
  evaluation_interval: 30s

rule_files:
  - /etc/prometheus/rules/*.yml

alerting:
  alertmanagers:
    - static_configs:
        - targets:
            - localhost:9093

scrape_configs:
  # Kubelet metrics
  - job_name: kubernetes-nodes
    scheme: https
    tls_config:
      ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
      insecure_skip_verify: true
    bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
    kubernetes_sd_configs:
      - role: node
    relabel_configs:
      - action: labelmap
        regex: __meta_kubernetes_node_label_(.+)

  # Container metrics via cAdvisor
  - job_name: kubernetes-nodes-cadvisor
    scheme: https
    tls_config:
      ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
      insecure_skip_verify: true
    bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
    kubernetes_sd_configs:
      - role: node
    relabel_configs:
      - action: labelmap
        regex: __meta_kubernetes_node_label_(.+)
      - target_label: __metrics_path__
        replacement: /metrics/cadvisor

  # Node exporter
  - job_name: node-exporter
    kubernetes_sd_configs:
      - role: node
    relabel_configs:
      - source_labels: [__address__]
        regex: (.+):(.+)
        target_label: __address__
        replacement: \${1}:9100

  # kube-state-metrics
  - job_name: kube-state-metrics
    static_configs:
      - targets:
          - kube-state-metrics.prometheus.svc.cluster.local:8080

  # Postgres exporter (shared database — postgres.db)
  - job_name: postgres-exporter
    static_configs:
      - targets:
          - postgres-exporter.prometheus.svc.cluster.local:9187

  # PgBouncer exporter (pool-saturation metrics — pgbouncer_pools_*)
  - job_name: pgbouncer-exporter
    static_configs:
      - targets:
          - pgbouncer-exporter.prometheus.svc.cluster.local:9127

  # DCGM exporter
  - job_name: dcgm-exporter
    kubernetes_sd_configs:
      - role: node
    relabel_configs:
      - source_labels: [__address__]
        regex: (.+):(.+)
        target_label: __address__
        replacement: \${1}:9400

  # Cloudflared metrics — the tunnel pods expose /metrics + /ready on :2000
  # (config-header.yaml binds metrics: 0.0.0.0:2000). Scraped via pod
  # service-discovery (mirroring the cnpg-pods / promtail jobs), NOT a static
  # Service-DNS target: the Deployment runs 2 replicas and no backing Service
  # named 'cloudflared' ever existed, so the old static target
  # cloudflared.cloudflared.svc.cluster.local:2000 read up==0 with no
  # ScrapeTargetDown alert to scream about it (#14241). Pod-SD yields a
  # per-replica up series, so the TargetDown rule below pinpoints which replica
  # died. The 'prometheus' ClusterRole already grants cluster-wide pod list.
  - job_name: cloudflared
    kubernetes_sd_configs:
      - role: pod
        namespaces:
          names: ["cloudflared"]
    relabel_configs:
      # Keep ONLY the tunnel Deployment pods. The ddns-headscale CronJob pods
      # share this namespace AND app.kubernetes.io/name=cloudflared, but carry
      # component=ddns and expose no :2000 metrics — matching on name alone
      # sweeps them in as up==0 targets that trip TargetDown (#14241). The
      # component=tunnel keep is the distinguishing filter.
      - source_labels: [__meta_kubernetes_pod_label_app_kubernetes_io_name]
        regex: cloudflared
        action: keep
      - source_labels: [__meta_kubernetes_pod_label_app_kubernetes_io_component]
        regex: tunnel
        action: keep
      - source_labels: [__meta_kubernetes_pod_ip]
        target_label: __address__
        replacement: \${1}:2000
      - source_labels: [__meta_kubernetes_pod_name]
        target_label: pod
      - source_labels: [__meta_kubernetes_pod_name]
        target_label: instance

  # Promtail metrics — scrapes Promtail's own /metrics on every node.
  - job_name: promtail
    kubernetes_sd_configs:
      - role: pod
        namespaces:
          names: ["loki"]
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_label_app_kubernetes_io_name]
        regex: promtail
        action: keep
      - source_labels: [__meta_kubernetes_pod_ip]
        target_label: __address__
        replacement: \${1}:3101
      - source_labels: [__meta_kubernetes_pod_node_name]
        target_label: node

  # Loki server metrics — Loki's own /metrics on :3100 (its single HTTP port;
  # synth-loki.ts). Loki was the one workload in this system with no
  # self-observability: this namespace was scraped but only for Promtail, so
  # loki_ingester_memory_streams — the canonical leading indicator for the
  # #16247 OOM cycle — had never been collected. An observability component
  # with no self-observability fails silently AND takes the diagnostic path
  # down with it; during that incident Loki was the tool used to tell an
  # OOMKill from a content failure, and its own health was the one thing
  # nobody could query (#16370).
  #
  # Do NOT verify this job with a loki_* prefix search. Promtail is built from
  # Loki's codebase and exports loki_-prefixed internals
  # (loki_internal_log_messages_total, loki_log_flushes_*, loki_panic_total),
  # so that search returned 174 series here while Loki coverage was zero — all
  # 174 on job=promtail. Presence answers "is there any"; the question is "is
  # there a target". The honest check is up{job="loki"}, or a metric only the
  # server exports (loki_build_info, loki_ingester_memory_streams).
  #
  # Keeping on name alone is sufficient and mirrors the sibling promtail job:
  # unlike cloudflared (#14241), nothing else in this namespace carries
  # app.kubernetes.io/name=loki. No tier label, so TargetDown covers process
  # death for free.
  - job_name: loki
    kubernetes_sd_configs:
      - role: pod
        namespaces:
          names: ["loki"]
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_label_app_kubernetes_io_name]
        regex: loki
        action: keep
      - source_labels: [__meta_kubernetes_pod_ip]
        target_label: __address__
        replacement: \${1}:3100
      - source_labels: [__meta_kubernetes_pod_name]
        target_label: pod
      - source_labels: [__meta_kubernetes_pod_name]
        target_label: instance

  # CNPG instance pods — the instance manager exposes native + barman-cloud
  # plugin metrics on :9187. The
  # barman_cloud_cloudnative_pg_io_last_available_backup_timestamp gauge feeds
  # the backup-age alerts (#14219); the deprecated cnpg_collector_* gauges
  # read 0 under plugin-mode backups, so this scrape is the live source of
  # backup-freshness truth.
  - job_name: cnpg-pods
    kubernetes_sd_configs:
      - role: pod
        namespaces:
          names: ["postgres"]
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_label_cnpg_io_podRole]
        regex: instance
        action: keep
      - source_labels: [__meta_kubernetes_pod_ip]
        target_label: __address__
        replacement: \${1}:9187
      - source_labels: [__meta_kubernetes_pod_name]
        target_label: pod
      - source_labels: [__meta_kubernetes_pod_name]
        target_label: instance

  # cert-manager controller — exposes certificate expiry/readiness gauges on
  # :9402 (certmanager_certificate_expiration_timestamp_seconds,
  # certmanager_certificate_ready_status). Before this job cert renewals were
  # Prometheus-invisible: a wedged DNS-01/Let's Encrypt renewal surfaced only as
  # a hard public outage ~30d later (#14277). No tier label, so TargetDown covers
  # the controller's process death for free. The metrics port is enabled by
  # default on the cert-manager Deployment (the controller's own Service).
  - job_name: cert-manager
    static_configs:
      - targets:
          - cert-manager.cert-manager.svc.cluster.local:9402

  # SeaweedFS master/volume/filer — native weed Prometheus metrics on :9327
  # (the -metricsPort flag, enabled in akasha/infrastructure/seaweedfs/seaweedfs-deployments/seaweedfs-deployments.module.code.ts;
  # off by default). SeaweedFS is the backup substrate, so
  # its liveness deserves a direct scrape witness rather than the 26h-delayed
  # backup-staleness inference downstream (#14277). One static target per
  # component with a component label, so a dedicated per-component liveness rule
  # (SeaweedfsVolumeServerDown) can select on component=volume; no tier label, so
  # TargetDown covers master/filer process death for free. The s3-gateway is
  # omitted — the weed s3 subcommand exposes no Prometheus registry.
  - job_name: seaweedfs
    static_configs:
      - targets: ["master.seaweedfs.svc.cluster.local:9327"]
        labels:
          component: master
      - targets: ["volume.seaweedfs.svc.cluster.local:9327"]
        labels:
          component: volume
      - targets: ["filer.seaweedfs.svc.cluster.local:9327"]
        labels:
          component: filer

  # Personal hosts (workstation + macbook) — host metrics over the tailnet.
  # Prometheus runs in-cluster and cannot route to tailnet CGNAT (100.64.0.0/10)
  # directly, so it scrapes through the tailnet-egress HTTP forward proxy
  # (--outbound-http-proxy-listen). node_exporter runs on each host as a managed
  # service (see the workstation provisioner). The friendly 'instance' label makes
  # them appear named (not raw IPs) in every by(instance) dashboard panel; the
  # 'tier: personal' label lets the node-threshold alerts exclude these machines
  # so a busy laptop never pages. Expect gaps when a host is asleep/offline.
  - job_name: personal-hosts
    proxy_url: http://tailnet-egress.tailnet-egress.svc.cluster.local:1055
    static_configs:
      - targets: ["100.64.0.4:9100"]
        labels:
          instance: workstation
          tier: personal
      - targets: ["100.64.0.2:9100"]
        labels:
          instance: macbook
          tier: personal

  # Personal GPU (workstation RTX 5080) — dcgm-exporter scraped over the tailnet
  # through the same forward proxy as personal-hosts. Runs as a managed container
  # service on the workstation (dcgm-exporter.service), set up by the provisioner.
  # The cluster mini-PCs have no NVIDIA GPU (their in-cluster dcgm-exporters scrape
  # up but emit nothing), so this is the only real source of GPU VRAM / util / temp
  # metrics. The static 'instance: workstation' label overrides the IP-derived
  # default so by(instance) dashboard panels show a named host; 'tier: personal'
  # keeps it out of node-threshold alerts. Expect gaps when the workstation sleeps.
  - job_name: personal-gpu
    proxy_url: http://tailnet-egress.tailnet-egress.svc.cluster.local:1055
    static_configs:
      - targets: ["100.64.0.4:9400"]
        labels:
          instance: workstation
          tier: personal
`
