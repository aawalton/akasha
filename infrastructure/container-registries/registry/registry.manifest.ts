import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.ts"

export const registry = {
  id: "01a07389-479d-7988-a712-086e2d690bfa",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "registry",
  definition: "the deployment running the store that has the images the cluster runs",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
