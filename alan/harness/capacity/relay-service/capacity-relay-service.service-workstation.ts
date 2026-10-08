import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const capacityRelayService = {
  id: "01a06230-614f-7c7a-b4f2-d985546de7af",
  type: "page-type/service-workstation",
  slug: "capacity-relay-service",
  definition: "the service carrying the capacity hours to the sites that show them",
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*:2/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
  createdAt: "2026-09-02T12:55:32.943Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceWorkstation
