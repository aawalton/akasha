import type { Manifest } from "@akasha/k8s-types/manifest"

export const cnpgCluster = {
  id: "01a06810-1262-718e-a2b3-5eb33330f9f5",
  pageTypeSlug: "manifest",
  slug: "cnpg-cluster",
  definition: "the managed Postgres cluster and the instances it keeps",
  code: "ts",
} as const satisfies Manifest
