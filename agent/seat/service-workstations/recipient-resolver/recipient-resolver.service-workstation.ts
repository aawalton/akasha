import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const recipientResolver = {
  id: "01a06829-0194-7fa2-a0e7-92e073ef2d21",
  type: "page-type/service-workstation",
  slug: "recipient-resolver",
  definition:
    "the service resolving each message's recipient and seating an agent in the seat named",
  enabled: true,
  systemd: {
    restartDelaySeconds: 5,
  },
  told: false,
  createdAt: "2026-09-03T16:45:12.980Z",
  updatedAt: "2026-09-25T14:02:04.000Z",
} as const satisfies ServiceWorkstation
