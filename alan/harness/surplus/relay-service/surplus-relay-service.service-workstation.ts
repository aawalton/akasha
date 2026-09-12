import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const surplusRelayService = {
  id: "01a05fc3-145a-7083-9cec-6a873c631afe",
  type: "service-workstation",
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
} as const satisfies ServiceWorkstation
