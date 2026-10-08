import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const monarchSync = {
  id: "01a06829-0194-7976-b3a8-db7df0bae3ef",
  type: "page-type/service-workstation",
  slug: "monarch-sync",
  definition: "the service copying the whole of Monarch and comparing the copy against it",
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "daily",
    jitterSeconds: 1800,
    catchUp: true,
    startTimeoutSeconds: 3600,
  },
  createdAt: "2026-09-03T16:45:12.980Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceWorkstation
