import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const loki = {
  id: "01a07379-1e35-708f-8cfb-987a31c54566",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "loki",
  definition: "the log store's namespace, its configuration, its deployment and the way in to it",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
