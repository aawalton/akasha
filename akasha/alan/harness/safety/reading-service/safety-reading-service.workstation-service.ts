import type { WorkstationService } from "@akasha/service-system/workstation-service"

export const safetyReadingService = {
  id: "01a05f42-92f5-7007-b8a6-32a3ffb8ea1d",
  pageTypeSlug: "workstation-service",
  slug: "safety-reading-service",
  definition: "the service taking Alan's safety level onto its readout",
  runs: ["bun akasha/alan/harness/safety/reading/safety-reading.module.code.ts"],
  enabled: true,
  systemd: {
    schedule: "*:0/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
} as const satisfies WorkstationService
