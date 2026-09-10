import type { WorkstationService } from "akasha/services/workstation-services/workstation-service.page-type.types.ts"

export const costReadingService = {
  id: "01a08b9e-80f3-7fa2-8202-3d110c33458d",
  pageTypeSlug: "workstation-service",
  type: "workstation-service",
  slug: "cost-reading-service",
  definition: "the service taking what Alan's open block costs onto its readout",
  runs: ["bun alan/harness/cost/reading/cost-reading.module.code.ts"],
  enabled: true,
  systemd: {
    schedule: "*:1/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
} as const satisfies WorkstationService
