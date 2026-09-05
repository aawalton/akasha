import type { Manifest } from "@akasha/k8s-types/manifest"

export const registry = {
  id: "01a07389-479d-7988-a712-086e2d690bfa",
  pageTypeSlug: "manifest",
  slug: "registry",
  definition: "the deployment running the store that holds the images the cluster runs",
  code: "ts",
} as const satisfies Manifest
