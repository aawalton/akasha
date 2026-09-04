import type { WorkstationService } from "@akasha/service-system/workstation-service"

export const surplusReadingService = {
  id: "01a05fc3-145a-7842-9c8e-fb0277ca41c3",
  pageTypeSlug: "workstation-service",
  slug: "surplus-reading-service",
  definition: "the service taking Alan's surplus hours onto its readout",
  runs: ["bun akasha/alan/harness/surplus/reading/surplus-reading.module.code.ts"],
  enabled: true,
  systemd: {
    schedule: "*:0/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
} as const satisfies WorkstationService
