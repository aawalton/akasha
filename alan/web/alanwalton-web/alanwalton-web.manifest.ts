import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.ts"

export const alanwaltonWeb = {
  id: "01a0737e-5eae-7286-97df-40905333f97f",
  pageTypeSlug: "manifest",
  slug: "alanwalton-web",
  definition: "the deployment and service running Alan's command center",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
