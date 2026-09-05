import type { Manifest } from "@akasha/k8s-types/manifest"

export const dcgmExporterDaemonset = {
  id: "01a0738e-e66c-74e0-ad63-f39417a8e9dd",
  pageTypeSlug: "manifest",
  slug: "dcgm-exporter-daemonset",
  definition: "the daemon set publishing each node's graphics card as metrics",
  code: "ts",
} as const satisfies Manifest
