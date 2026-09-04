import type { WorkstationService } from "../workstation-service.page-type.ts"

export const sendDueReminders = {
  id: "01a06829-0194-7cac-9819-5df28b44cea6",
  pageTypeSlug: "workstation-service",
  slug: "send-due-reminders",
  definition: "the service sending each reminder whose schedule has come due",
  runs: ["bun reminder-system/due-reminder-sending/due-reminder-sending.module.code.ts"],
  enabled: true,
  systemd: {
    schedule: "minutely",
    jitterSeconds: 5,
    accuracySeconds: 1,
    startTimeoutSeconds: 300,
  },
} as const satisfies WorkstationService
