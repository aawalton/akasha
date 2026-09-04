import type { Manifest } from "@akasha/k8s-types/manifest"

export const exporterDaemonsets = {
  id: "01a06810-1263-787b-9195-38665bcd1e92",
  pageTypeSlug: "manifest",
  slug: "exporter-daemonsets",
  definition: "the node and graphics card exporters that run one copy per node",
  code: "ts",
} as const satisfies Manifest
