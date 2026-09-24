import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const talosSubnetRouter = {
  id: "01a07390-b294-7b97-9afc-77a5b8ae3f76",
  type: "page-type/manifest",
  slug: "talos-subnet-router",
  definition: "the deployment carrying private network traffic to the cluster nodes' addresses",
  code: "ts",
  minCpuMillicores: 50,
  minMemoryMb: 1024,
  killMemoryMb: 1024,
  generatedDirectory: true,
} as const satisfies Manifest
