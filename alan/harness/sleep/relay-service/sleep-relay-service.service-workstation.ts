import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const sleepRelayService = {
  id: "01a06220-ef8c-7a3e-a40b-06bc3fc01541",
  type: "page-type/service-workstation",
  slug: "sleep-relay-service",
  definition: "the service that sends Alan's hours of sleep to the websites that show the hours",
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*:2/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
  createdAt: "2026-09-02T12:38:40.780Z",
  updatedAt: "2026-10-30T16:02:23.881Z",
} as const satisfies ServiceWorkstation
