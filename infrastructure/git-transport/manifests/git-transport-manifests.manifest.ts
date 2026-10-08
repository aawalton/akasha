import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const gitTransportManifests = {
  id: "01a07385-11fa-700e-9c7d-639aebf648f7",
  type: "page-type/manifest",
  slug: "git-transport-manifests",
  definition: "the namespace, the disk the repositories sit on and the deployment serving them",
  code: "ts",
  minCpuMillicores: 1000,
  maxCpuMillicores: 16000,
  minMemoryMb: 8192,
  killMemoryMb: 8192,
  generatedDirectory: true,
  createdAt: "2026-09-05T21:41:35.866Z",
  updatedAt: "2026-09-24T23:21:37.000Z",
} as const satisfies Manifest
