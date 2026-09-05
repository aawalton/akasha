import type { Manifest } from "@akasha/k8s-types/manifest"

export const seaweedfsMaintenance = {
  id: "01a07380-3b60-7ede-8cda-e469a40f6113",
  pageTypeSlug: "manifest",
  slug: "seaweedfs-maintenance",
  definition:
    "the namespace and the cron job rebalancing and compacting the volumes files are held in",
  code: "ts",
} as const satisfies Manifest
