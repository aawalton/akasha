import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const dcgmExporterDaemonset = {
  id: "01a0738e-e66c-74e0-ad63-f39417a8e9dd",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "dcgm-exporter-daemonset",
  definition: "the daemon set publishing each node's graphics card as metrics",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
