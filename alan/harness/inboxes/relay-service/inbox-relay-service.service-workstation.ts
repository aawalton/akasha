import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const inboxRelayService = {
  id: "01a06230-b156-7667-b81e-d7a74183ae8d",
  type: "service-workstation",
  slug: "inbox-relay-service",
  definition: "the service carrying the inbox counts to the site that shows them",
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*:2/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
} as const satisfies ServiceWorkstation
