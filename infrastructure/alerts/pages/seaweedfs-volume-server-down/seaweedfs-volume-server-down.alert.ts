import type { Alert } from "akasha/infrastructure/alerts/alert.page-type.types.ts"

export const seaweedfsVolumeServerDown = {
  id: "01a06755-62fb-7538-95b6-8c6185b09935",
  type: "alert",
  slug: "seaweedfs-volume-server-down",
  title: "SeaweedFS volume server down",
  definition: "a SeaweedFS volume server is not answering",
  domain: "infrastructure",
  summary: "SeaweedFS volume server is down",
  runbook: "txt",
} as const satisfies Alert
