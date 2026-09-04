import type { WorkstationService } from "@akasha/service-system/workstation-service"

export const inboxReadingService = {
  id: "01a06230-b156-758f-964c-393712fcedd4",
  pageTypeSlug: "workstation-service",
  slug: "inbox-reading-service",
  definition: "the service taking Alan's five inbox counts onto their readouts",
  runs: ["bun alan/harness/inboxes/reading/inbox-reading.module.code.ts"],
  enabled: true,
  systemd: {
    schedule: "*:0/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
} as const satisfies WorkstationService
