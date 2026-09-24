import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const nvidiaDevicePlugin = {
  id: "01a0738e-7f15-71c0-905e-3746cbb4535e",
  type: "page-type/manifest",
  slug: "nvidia-device-plugin",
  definition: "the daemon set offering a node's graphics cards to the cluster as a resource",
  code: "ts",
  minCpuMillicores: 5,
  minMemoryMb: 64,
  killMemoryMb: 64,
  generatedDirectory: true,
} as const satisfies Manifest
