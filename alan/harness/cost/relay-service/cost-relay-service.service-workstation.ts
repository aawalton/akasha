import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const costRelayService = {
  id: "01a08b9e-9c00-7973-981e-e586a9afa38d",
  type: "service-workstation",
  slug: "cost-relay-service",
  definition: "the service carrying the cost to the sites that show it",
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*:3/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
} as const satisfies ServiceWorkstation
