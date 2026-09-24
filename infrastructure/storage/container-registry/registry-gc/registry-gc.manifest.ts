import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const registryGc = {
  id: "01a0738b-7f1f-7b3e-9dfb-d5f74f87561c",
  type: "page-type/manifest",
  slug: "registry-gc",
  definition: "the cron job that removes an image layer nothing refers to",
  code: "ts",
  minCpuMillicores: 10,
  minMemoryMb: 128,
  killMemoryMb: 128,
  generatedDirectory: true,
} as const satisfies Manifest
