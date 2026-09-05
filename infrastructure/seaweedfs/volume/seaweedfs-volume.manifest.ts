import type { Manifest } from "@akasha/k8s-types/manifest"

export const seaweedfsVolume = {
  id: "01a0737b-4b69-735e-8694-95385d056ff3",
  pageTypeSlug: "manifest",
  slug: "seaweedfs-volume",
  definition: "the deployment holding the bytes of the stored files and the way in to it",
  code: "ts",
} as const satisfies Manifest
