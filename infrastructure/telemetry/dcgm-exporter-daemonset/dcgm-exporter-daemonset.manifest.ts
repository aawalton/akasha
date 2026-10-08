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
  createdAt: "2026-09-05T21:52:20.076Z",
  updatedAt: "2026-09-24T23:20:38.000Z",
} as const satisfies Manifest
