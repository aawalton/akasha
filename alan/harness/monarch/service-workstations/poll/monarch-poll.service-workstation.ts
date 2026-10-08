import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const monarchPoll = {
  id: "01a06829-0194-7a16-9864-72598a2e5654",
  type: "page-type/service-workstation",
  slug: "monarch-poll",
  definition: "the service landing the Monarch rows whose update time has moved",
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "minutely",
    jitterSeconds: 10,
    accuracySeconds: 1,
    startTimeoutSeconds: 300,
  },
  createdAt: "2026-09-03T16:45:12.980Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceWorkstation
