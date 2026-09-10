import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const kubeStateMetrics = {
  id: "01a07393-6503-7393-861b-7b34e761f6d1",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "kube-state-metrics",
  definition: "the cluster object exporter's permissions, its deployment and the way in to it",
  parts: ["module/kube-state-metrics-manifests"],
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
