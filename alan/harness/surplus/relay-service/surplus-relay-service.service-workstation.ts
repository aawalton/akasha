import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const surplusRelayService = {
  id: "01a05fc3-145a-7083-9cec-6a873c631afe",
  type: "page-type/service-workstation",
  slug: "surplus-relay-service",
  definition: "the service carrying the surplus hours to the sites that show them",
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*:2/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
  createdAt: "2026-09-02T01:36:55.386Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceWorkstation
