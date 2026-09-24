import {
  kubernetesLabels,
  selectorOf,
} from "akasha/infrastructure/cluster/k8s-type/modules/labels/labels.module.code.ts"
import { prometheus } from "akasha/infrastructure/service/akasha-service/service-cluster/pages/prometheus/prometheus.service-cluster.ts"

export const NAMESPACE = prometheus.namespace
export const KUBE_SYSTEM_NAMESPACE = "kube-system"

const PART_OF = "monitoring"
const MANAGED_BY = "bootstrap"

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
