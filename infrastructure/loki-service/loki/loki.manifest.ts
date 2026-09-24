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
} as const satisfies Manifest
