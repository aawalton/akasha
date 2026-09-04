import type { Module } from "@akasha/code-system/module"

export const kubeStateMetricsManifests = {
  id: "01a06810-1263-753b-bf6d-e694525611e4",
  pageTypeSlug: "module",
  slug: "kube-state-metrics-manifests",
  definition: "the exporter that publishes the cluster's objects as metrics",
  code: "ts",
} as const satisfies Module
