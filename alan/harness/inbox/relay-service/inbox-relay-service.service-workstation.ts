import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const inboxRelayService = {
  id: "01a06230-b156-7667-b81e-d7a74183ae8d",
  type: "page-type/service-workstation",
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
  createdAt: "2026-09-02T12:55:53.430Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceWorkstation
