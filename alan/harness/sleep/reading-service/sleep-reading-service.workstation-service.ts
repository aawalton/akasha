import type { WorkstationService } from "@akasha/service-system/workstation-service"

export const sleepReadingService = {
  id: "01a06220-ef8c-7501-a97f-688355f6fa47",
  pageTypeSlug: "workstation-service",
  slug: "sleep-reading-service",
  definition: "the service taking Alan's sleep hours onto its readout",
  runs: ["bun alan/harness/sleep/reading/sleep-reading.module.code.ts"],
  enabled: true,
  systemd: {
    schedule: "*:0/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
} as const satisfies WorkstationService
