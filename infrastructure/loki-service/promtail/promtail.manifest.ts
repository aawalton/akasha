import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.ts"

export const promtail = {
  id: "01a0737b-690e-7979-8a39-9a70362ce116",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "promtail",
  definition:
    "the log collector's configuration, its permissions and the daemonset running it on every node",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
