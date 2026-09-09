import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.ts"

export const gotrue = {
  id: "01a07392-eb90-7365-83c5-0bbc61079f30",
  pageTypeSlug: "manifest",
  slug: "gotrue",
  definition: "the auth server workload, its namespace and the way in to it",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
