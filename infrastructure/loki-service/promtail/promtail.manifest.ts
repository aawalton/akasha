import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const promtail = {
  id: "01a0737b-690e-7979-8a39-9a70362ce116",
  type: "page-type/manifest",
  slug: "promtail",
  definition:
    "the log collector's configuration, its permissions and the daemonset running it on every node",
  code: "ts",
  minCpuMillicores: 15,
  minMemoryMb: 512,
  killMemoryMb: 512,
  generatedDirectory: true,
} as const satisfies Manifest
