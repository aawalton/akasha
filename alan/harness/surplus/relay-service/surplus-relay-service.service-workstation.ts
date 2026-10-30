import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const surplusRelayService = {
  id: "01a05fc3-145a-7083-9cec-6a873c631afe",
  type: "page-type/service-workstation",
  slug: "surplus-relay-service",
  definition: "the service that sends the surplus to the websites that show the surplus",
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*:2/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
  createdAt: "2026-09-02T01:36:55.386Z",
  updatedAt: "2026-10-30T15:59:45.800Z",
} as const satisfies ServiceWorkstation
