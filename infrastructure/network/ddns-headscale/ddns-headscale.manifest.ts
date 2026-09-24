import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const ddnsHeadscale = {
  id: "01a0738a-4c62-7fa1-8bea-d9519b63d846",
  type: "page-type/manifest",
  slug: "ddns-headscale",
  definition: "the namespace and cron job that point a public name at the current address",
  code: "ts",
  minCpuMillicores: 10,
  minMemoryMb: 64,
  killMemoryMb: 64,
  generatedDirectory: true,
} as const satisfies Manifest
