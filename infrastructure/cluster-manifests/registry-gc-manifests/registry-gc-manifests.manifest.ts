import type { Manifest } from "@akasha/k8s-types/manifest"

export const registryGcManifests = {
  id: "01a06810-1263-7a51-b717-9c34e39b183b",
  pageTypeSlug: "manifest",
  slug: "registry-gc-manifests",
  definition: "the job that drops an image layer and tag nothing refers to",
  code: "ts",
} as const satisfies Manifest
