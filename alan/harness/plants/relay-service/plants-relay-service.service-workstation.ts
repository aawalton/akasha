import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const plantsRelayService = {
  id: "01a06221-d65f-71c6-9f1e-446dff470034",
  type: "service-workstation",
  slug: "plants-relay-service",
  definition: "the service carrying the plant grams to the sites that show them",
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*:2/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
} as const satisfies ServiceWorkstation
