import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const monarchPoll = {
  id: "01a06829-0194-7a16-9864-72598a2e5654",
  type: "page-type/service-workstation",
  slug: "monarch-poll",
  definition: "the service that copies a Monarch transaction when Monarch changes the transaction",
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "minutely",
    jitterSeconds: 10,
    accuracySeconds: 1,
    startTimeoutSeconds: 300,
  },
  createdAt: "2026-09-03T16:45:12.980Z",
  updatedAt: "2026-10-30T15:51:25.046Z",
} as const satisfies ServiceWorkstation
