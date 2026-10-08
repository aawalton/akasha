import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const registry = {
  id: "01a07389-479d-7988-a712-086e2d690bfa",
  type: "page-type/manifest",
  slug: "registry",
  definition: "the deployment running the store that has the images the cluster runs",
  code: "ts",
  minCpuMillicores: 100,
  minMemoryMb: 512,
  killMemoryMb: 512,
  generatedDirectory: true,
  createdAt: "2026-09-05T21:46:11.741Z",
  updatedAt: "2026-09-24T23:15:06.000Z",
} as const satisfies Manifest
