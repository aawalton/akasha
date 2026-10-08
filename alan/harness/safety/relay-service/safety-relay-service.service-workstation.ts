import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const safetyRelayService = {
  id: "01a05f4d-1a20-7000-9c31-6de0f0f4a1b2",
  type: "page-type/service-workstation",
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
  createdAt: "2026-09-01T23:28:03.616Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceWorkstation
