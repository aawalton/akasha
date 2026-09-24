import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const podJanitor = {
  id: "01a07391-4a2e-7350-bb33-6715d67b40a3",
  type: "page-type/manifest",
  slug: "pod-janitor",
  definition: "the cron job that removes a failed pod its controller left behind",
  code: "ts",
  minCpuMillicores: 10,
  minMemoryMb: 128,
  killMemoryMb: 128,
  generatedDirectory: true,
} as const satisfies Manifest
