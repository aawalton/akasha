import type { Alert } from "../../alert.page-type.types.ts"

export const seaweedfsStorageRunwayShort = {
  id: "01a06755-62fb-7e3c-a529-a6ff20c108b4",
  pageTypeSlug: "alert",
  type: "alert",
  slug: "seaweedfs-storage-runway-short",
  title: "SeaweedFS storage runway short",
  definition: "SeaweedFS is filling fast enough to run out of room soon",
  domain: "infrastructure",
  summary: "SeaweedFS store on {{ $labels.instance }} predicted to fill within 7 days",
  runbook: "txt",
} as const satisfies Alert
