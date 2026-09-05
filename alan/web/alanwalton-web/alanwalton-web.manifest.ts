import type { Manifest } from "@akasha/k8s-types/manifest"

export const alanwaltonWeb = {
  id: "01a0737e-5eae-7286-97df-40905333f97f",
  pageTypeSlug: "manifest",
  slug: "alanwalton-web",
  definition: "the deployment and service running Alan's command center",
  code: "ts",
} as const satisfies Manifest
