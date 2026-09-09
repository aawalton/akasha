import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.ts"

export const pageStore = {
  id: "01a0738a-b8a8-7ed0-b30c-fb54c86490a9",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "page-store",
  definition:
    "the socat forwarder workload, its namespace, the way in to it and the network policies around it",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
