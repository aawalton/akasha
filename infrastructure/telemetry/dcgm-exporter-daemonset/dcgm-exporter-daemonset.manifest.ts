import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const dcgmExporterDaemonset = {
  id: "01a0738e-e66c-74e0-ad63-f39417a8e9dd",
  type: "page-type/manifest",
  slug: "dcgm-exporter-daemonset",
  definition: "the daemon set publishing each node's graphics card as metrics",
  code: "ts",
  minCpuMillicores: 5,
  minMemoryMb: 576,
  killMemoryMb: 576,
  generatedDirectory: true,
} as const satisfies Manifest
