import type { Alert } from "../alert.page-type.ts"

export const seaweedfsVolumeServerDown = {
  id: "01a06755-62fb-7538-95b6-8c6185b09935",
  pageTypeSlug: "alert",
  slug: "seaweedfs-volume-server-down",
  title: "SeaweedFS volume server down",
  definition: "a SeaweedFS volume server is not answering",
  domain: "infrastructure",
  summary: "SeaweedFS volume server is down",
  description: "txt",
} as const satisfies Alert
