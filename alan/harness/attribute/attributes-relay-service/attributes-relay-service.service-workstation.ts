import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const attributesRelayService = {
  id: "01a0687a-f498-78ce-a19b-36b6b2217113",
  type: "page-type/service-workstation",
  slug: "attributes-relay-service",
  definition: "the service carrying the seven attribute points to the site that shows them",
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*:2/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 120,
    catchUp: false,
  },
  createdAt: "2026-09-03T18:14:43.608Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceWorkstation
