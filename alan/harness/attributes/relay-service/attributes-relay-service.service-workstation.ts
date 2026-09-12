import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const attributesRelayService = {
  id: "01a0687a-f498-78ce-a19b-36b6b2217113",
  type: "service-workstation",
  slug: "attributes-relay-service",
  definition: "the service carrying the six attribute points to the site that shows them",
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*:2/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 120,
    catchUp: false,
  },
} as const satisfies ServiceWorkstation
