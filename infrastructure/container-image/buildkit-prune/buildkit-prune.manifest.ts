import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const buildkitPrune = {
  id: "01a0737c-c2fe-7f6b-8abb-9b394a3320e5",
  type: "page-type/manifest",
  slug: "buildkit-prune",
  definition: "the cron job that clears the builder's unused cache",
  code: "ts",
  minCpuMillicores: 100,
  maxCpuMillicores: 500,
  minMemoryMb: 256,
  killMemoryMb: 256,
  generatedDirectory: true,
} as const satisfies Manifest
