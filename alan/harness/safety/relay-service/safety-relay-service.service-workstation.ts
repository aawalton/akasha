import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const safetyRelayService = {
  id: "01a05f4d-1a20-7000-9c31-6de0f0f4a1b2",
  type: "service-workstation",
  slug: "safety-relay-service",
  definition: "the service carrying the safety level to the sites that show it",
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*:2/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
} as const satisfies ServiceWorkstation
