import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const sendDueReminders = {
  id: "01a06829-0194-7cac-9819-5df28b44cea6",
  type: "page-type/service-workstation",
  slug: "send-due-reminders",
  definition: "the service sending each reminder whose schedule has come due",
  enabled: true,
  systemd: {
    schedule: "minutely",
    jitterSeconds: 5,
    accuracySeconds: 1,
    startTimeoutSeconds: 300,
  },
  createdAt: "2026-09-03T16:45:12.980Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceWorkstation
