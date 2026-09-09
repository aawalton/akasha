import type { Alert } from "../alert.page-type.ts"

export const seaweedfsStorageHigh = {
  id: "01a06755-62fb-7a92-a2a3-57bd4c66511a",
  pageTypeSlug: "alert",
  type: "alert",
  slug: "seaweedfs-storage-high",
  title: "SeaweedFS storage high",
  definition: "SeaweedFS is holding close to as much as it has room for",
  domain: "infrastructure",
  summary: "'SeaweedFS store on {{ $labels.instance }} is {{ $value | printf \"%.1f\" }}% free'",
  runbook: "txt",
} as const satisfies Alert
