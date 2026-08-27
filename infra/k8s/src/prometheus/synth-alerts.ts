import { CGROUP_PSI_ALERTS } from "./synth-alerts-cgroup-psi"
import { CLUSTER_ALERTS } from "./synth-alerts-cluster"
import { CLUSTER_DEEP_ALERTS } from "./synth-alerts-cluster-deep"
import { INFRA_ALERTS } from "./synth-alerts-infra"
import { KUBEPODS_OOM_ALERTS } from "./synth-alerts-kubepods-oom"
import { LOKI_ALERTS } from "./synth-alerts-loki"
import { QUERY_PERF_ALERTS } from "./synth-alerts-query-perf"

export const ALERT_RULES = `groups:
  # Recording rules that re-express the macOS (darwin) node_exporter memory
  # collector under the Linux metric names the shared dashboards query, so the
  # macbook ('personal-hosts' job) drops into the same Node Memory panel as the
  # Linux hosts. node_memory_total_bytes is a darwin-only series — the Linux
  # node_exporter never emits it — so these rules only ever produce output for
  # the macOS host; no collision with the workstation's real Linux series.
  # MemAvailable analog = free + inactive + purgeable (the reclaimable buckets),
  # mirroring how macOS reports available memory; it is a faithful analog, not a
  # byte-identical match to Linux MemAvailable. CPU/disk/network already flow
  # natively; only memory needs the name bridge.
  - name: macos-memory-normalization
    rules:
      - record: node_memory_MemTotal_bytes
        expr: node_memory_total_bytes
      - record: node_memory_MemAvailable_bytes
        expr: node_memory_free_bytes + node_memory_inactive_bytes + node_memory_purgeable_bytes
${CLUSTER_ALERTS}
${CLUSTER_DEEP_ALERTS}
${INFRA_ALERTS}
${QUERY_PERF_ALERTS}
${KUBEPODS_OOM_ALERTS}
${LOKI_ALERTS}
${CGROUP_PSI_ALERTS}`
