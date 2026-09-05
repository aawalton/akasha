import type { Manifest } from "@akasha/k8s-types/manifest"

export const seaweedfsMaster = {
  id: "01a07379-39d2-7fb0-901a-69abcc99cc08",
  pageTypeSlug: "manifest",
  slug: "seaweedfs-master",
  definition:
    "the namespace, the store's disks and the deployment deciding which volume a file goes to",
  code: "ts",
} as const satisfies Manifest
