import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const seaweedfsMaintenance = {
  id: "01a07380-3b60-7ede-8cda-e469a40f6113",
  type: "page-type/manifest",
  slug: "seaweedfs-maintenance",
  definition: "the namespace and the cron job rebalancing and compacting the volumes holding files",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
