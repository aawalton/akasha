import type { Manifest } from "@akasha/k8s-types/manifest"

export const alanwaltonAtlas = {
  id: "01a07382-cc82-70f9-994d-20709df7bec4",
  pageTypeSlug: "manifest",
  slug: "alanwalton-atlas",
  definition: "the deployment and service drawing Alan's map and taking in his phone's locations",
  code: "ts",
} as const satisfies Manifest
