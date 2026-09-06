import type { Manifest } from "@akasha/k8s-types/manifest"

export const pageStore = {
  id: "01a0738a-b8a8-7ed0-b30c-fb54c86490a9",
  pageTypeSlug: "manifest",
  slug: "page-store",
  definition:
    "the socat forwarder workload, its namespace, the way in to it and the network policies around it",
  code: "ts",
} as const satisfies Manifest
