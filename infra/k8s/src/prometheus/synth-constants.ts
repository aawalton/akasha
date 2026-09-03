import { kubernetesLabels, selectorOf } from "@akasha/k8s-types/labels"

export const NAMESPACE = "prometheus"
export const KUBE_SYSTEM_NAMESPACE = "kube-system"

const PART_OF = "monitoring"
const MANAGED_BY = "bootstrap"

export const PROMETHEUS_IMAGE = "prom/prometheus:v2.54.1"
export const ALERTMANAGER_IMAGE = "prom/alertmanager:v0.27.0"
export const POSTGRES_EXPORTER_IMAGE = "prometheuscommunity/postgres-exporter:v0.15.0"
export const KUBE_STATE_METRICS_IMAGE =
  "registry.k8s.io/kube-state-metrics/kube-state-metrics:v2.13.0"
export const NODE_EXPORTER_IMAGE = "prom/node-exporter:v1.8.2"
export const DCGM_EXPORTER_IMAGE = "nvcr.io/nvidia/k8s/dcgm-exporter:3.3.8-3.6.0-ubuntu22.04"
export const BUSYBOX_IMAGE = "busybox:1.36"

export const NAMESPACE_LABELS = kubernetesLabels({
  name: "prometheus",
  managedBy: MANAGED_BY,
})

export const PROMETHEUS_LABELS = kubernetesLabels({
  name: "prometheus",
  instance: "prometheus",
  component: "server",
  partOf: PART_OF,
  managedBy: MANAGED_BY,
})

export const PROMETHEUS_SELECTOR_LABELS = selectorOf(PROMETHEUS_LABELS, "name-instance")

export const POSTGRES_EXPORTER_LABELS = kubernetesLabels({
  name: "postgres-exporter",
  instance: "prometheus",
  component: "exporter",
  partOf: PART_OF,
  managedBy: MANAGED_BY,
})

export const POSTGRES_EXPORTER_SELECTOR_LABELS = selectorOf(
  POSTGRES_EXPORTER_LABELS,
  "name-instance"
)

export const PGBOUNCER_EXPORTER_IMAGE = "prometheuscommunity/pgbouncer-exporter:v0.12.0"

export const PGBOUNCER_EXPORTER_LABELS = kubernetesLabels({
  name: "pgbouncer-exporter",
  instance: "prometheus",
  component: "exporter",
  partOf: PART_OF,
  managedBy: MANAGED_BY,
})

export const PGBOUNCER_EXPORTER_SELECTOR_LABELS = selectorOf(
  PGBOUNCER_EXPORTER_LABELS,
  "name-instance"
)

export const KUBE_STATE_METRICS_LABELS = kubernetesLabels({
  name: "kube-state-metrics",
  instance: "prometheus",
  component: "exporter",
  partOf: PART_OF,
  managedBy: MANAGED_BY,
})

export const KUBE_STATE_METRICS_SELECTOR_LABELS = selectorOf(
  KUBE_STATE_METRICS_LABELS,
  "name-instance"
)

export const NODE_EXPORTER_LABELS = kubernetesLabels({
  name: "node-exporter",
  instance: "infra",
  component: "exporter",
  partOf: PART_OF,
  managedBy: MANAGED_BY,
})

export const NODE_EXPORTER_SELECTOR_LABELS = selectorOf(NODE_EXPORTER_LABELS, "name-instance")

export const DCGM_EXPORTER_LABELS = kubernetesLabels({
  name: "dcgm-exporter",
  instance: "infra",
  component: "exporter",
  partOf: PART_OF,
  managedBy: MANAGED_BY,
})

export const DCGM_EXPORTER_SELECTOR_LABELS = selectorOf(DCGM_EXPORTER_LABELS, "name-instance")
