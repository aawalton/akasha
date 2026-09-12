import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const sleepRelayService = {
  id: "01a06220-ef8c-7a3e-a40b-06bc3fc01541",
  type: "service-workstation",
  slug: "sleep-relay-service",
  definition: "the service carrying the sleep hours to the sites that show them",
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*:2/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
} as const satisfies ServiceWorkstation
