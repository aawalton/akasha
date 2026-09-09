import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.ts"

export const seaweedfsVolume = {
  id: "01a0737b-4b69-735e-8694-95385d056ff3",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "seaweedfs-volume",
  definition: "the deployment with the bytes of the stored files and the way in to it",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
