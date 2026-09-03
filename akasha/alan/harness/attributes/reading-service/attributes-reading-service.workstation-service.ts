import type { WorkstationService } from "@akasha/service-system/workstation-service"

export const attributesReadingService = {
  id: "01a0687a-f498-7bb3-9dda-498658aa9f69",
  pageTypeSlug: "workstation-service",
  slug: "attributes-reading-service",
  definition: "the service taking Alan's six attribute points onto their readouts",
  runs: ["bun readouts/attributes-reading.ts"],
  enabled: true,
  systemd: {
    schedule: "*:0/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
} as const satisfies WorkstationService
