import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const loki = {
  id: "01a07379-1e35-708f-8cfb-987a31c54566",
  type: "page-type/manifest",
  slug: "loki",
  definition: "the log store's namespace, its config, its deployment and the way in to it",
  code: "ts",
  minCpuMillicores: 15,
  minMemoryMb: 2048,
  killMemoryMb: 2048,
  generatedDirectory: true,
  createdAt: "2026-09-05T21:28:32.565Z",
  updatedAt: "2026-09-24T23:19:34.000Z",
} as const satisfies Manifest
