import type { Module } from "@akasha/code-system/module"

export const kubeStateMetricsManifests = {
  id: "01a073ae-d7ce-7b11-9dd4-8fca7346fe51",
  pageTypeSlug: "module",
  slug: "kube-state-metrics-manifests",
  definition: "the exporter that publishes the cluster's objects as metrics",
  code: "ts",
} as const satisfies Module
