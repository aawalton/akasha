import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const costRelayService = {
  id: "01a08b9e-9c00-7973-981e-e586a9afa38d",
  type: "page-type/service-workstation",
  slug: "cost-relay-service",
  definition: "the service that carries the cost to the websites that show the cost",
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*:3/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
  createdAt: "2026-09-10T14:00:22.784Z",
  updatedAt: "2026-10-30T15:31:36.400Z",
} as const satisfies ServiceWorkstation
