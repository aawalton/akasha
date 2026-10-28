import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const royalRoadSync = {
  id: "01a06829-0194-78d3-8693-e4cc1c1e6e9a",
  type: "page-type/service-workstation",
  slug: "royal-road-sync",
  definition: "the service syncing Royal Road chapters",
  enabled: true,
  needsSecrets: false,
  systemd: {
    schedule: "hourly",
    jitterSeconds: 300,
    catchUp: true,
    startTimeoutSeconds: 21600,
  },
  createdAt: "2026-09-03T16:45:12.980Z",
  updatedAt: "2026-10-28T16:31:24.181Z",
} as const satisfies ServiceWorkstation
