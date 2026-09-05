import type { Manifest } from "@akasha/k8s-types/manifest"

export const loki = {
  id: "01a07379-1e35-708f-8cfb-987a31c54566",
  pageTypeSlug: "manifest",
  slug: "loki",
  definition: "the log store's namespace, its configuration, its deployment and the way in to it",
  code: "ts",
} as const satisfies Manifest
