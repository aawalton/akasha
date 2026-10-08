import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const kubeStateMetricsManifests = {
  id: "01a073ae-d7ce-7b11-9dd4-8fca7346fe51",
  type: "page-type/module",
  slug: "kube-state-metrics-manifests",
  definition: "the exporter that publishes the cluster's objects as metrics",
  code: "ts",
  createdAt: "2026-09-05T22:27:13.486Z",
  updatedAt: "2026-09-15T18:35:14.000Z",
} as const satisfies Module
