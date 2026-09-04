import type { WorkstationService } from "@akasha/service-system/workstation-service"

export const plantsReadingService = {
  id: "01a06221-d65f-7be9-9a9b-a64cecbc3d7e",
  pageTypeSlug: "workstation-service",
  slug: "plants-reading-service",
  definition: "the service taking Alan's plant grams onto its readout",
  runs: ["bun akasha/alan/harness/plants/reading/plants-reading.module.code.ts"],
  enabled: true,
  systemd: {
    schedule: "*:0/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
} as const satisfies WorkstationService
