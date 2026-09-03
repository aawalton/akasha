import type { Alert } from "../alert.page-type.ts"

export const seaweedfsVolumeHeartbeatStalled = {
  id: "01a06755-62fb-7283-91e9-456e08ff1935",
  pageTypeSlug: "alert",
  slug: "seaweedfs-volume-heartbeat-stalled",
  title: "SeaweedFS volume heartbeat stalled",
  definition: "a SeaweedFS volume server has stopped reporting itself alive",
  domain: "infrastructure",
  summary: "SeaweedFS master has received no volume-server heartbeats in 10m",
  description: "txt",
} as const satisfies Alert
