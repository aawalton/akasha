import type { WorkstationService } from "@akasha/service-system/workstation-service"

export const activityReadingService = {
  id: "01a06222-9828-7301-9a69-8bbbd978cc7c",
  pageTypeSlug: "workstation-service",
  slug: "activity-reading-service",
  definition: "the service taking Alan's activity calories onto its readout",
  runs: ["bun akasha/alan/harness/activity/reading/activity-reading.module.code.ts"],
  enabled: true,
  systemd: {
    schedule: "*:0/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
} as const satisfies WorkstationService
