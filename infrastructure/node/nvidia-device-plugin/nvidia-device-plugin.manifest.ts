import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.ts"

export const nvidiaDevicePlugin = {
  id: "01a0738e-7f15-71c0-905e-3746cbb4535e",
  pageTypeSlug: "manifest",
  slug: "nvidia-device-plugin",
  definition: "the daemon set offering a node's graphics cards to the cluster as a resource",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
