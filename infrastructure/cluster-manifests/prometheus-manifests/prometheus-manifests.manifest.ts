import type { Manifest } from "@akasha/k8s-types/manifest"

export const prometheusManifests = {
  id: "01a06810-1263-7164-a5c1-36cfd6f66645",
  pageTypeSlug: "manifest",
  slug: "prometheus-manifests",
  definition: "the metrics server, its storage, its access rules and the way in to it",
  code: "ts",
} as const satisfies Manifest
