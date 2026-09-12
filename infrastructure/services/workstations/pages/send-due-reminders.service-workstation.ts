import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const sendDueReminders = {
  id: "01a06829-0194-7cac-9819-5df28b44cea6",
  type: "service-workstation",
  slug: "send-due-reminders",
  definition: "the service sending each reminder whose schedule has come due",
  enabled: true,
  systemd: {
    schedule: "minutely",
    jitterSeconds: 5,
    accuracySeconds: 1,
    startTimeoutSeconds: 300,
  },
} as const satisfies ServiceWorkstation
