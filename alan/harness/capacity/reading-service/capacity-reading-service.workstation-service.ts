import type { WorkstationService } from "@akasha/service-system/workstation-service"

export const capacityReadingService = {
  id: "01a06230-614f-74ae-9bd6-616c955963b4",
  pageTypeSlug: "workstation-service",
  slug: "capacity-reading-service",
  definition: "the service taking Alan's capacity hours onto its readout",
  runs: ["bun akasha/alan/harness/capacity/reading/capacity-reading.module.code.ts"],
  enabled: true,
  systemd: {
    schedule: "*:0/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
} as const satisfies WorkstationService
