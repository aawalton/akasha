import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const pageForwarder = {
  id: "01a0738a-b8a8-7ed0-b30c-fb54c86490a9",
  type: "page-type/manifest",
  slug: "page-forwarder",
  definition:
    "the socat forwarder workload, its namespace, the way in to it and the network policies around it",
  code: "ts",
  minCpuMillicores: 10,
  minMemoryMb: 32,
  killMemoryMb: 64,
  generatedDirectory: true,
} as const satisfies Manifest
