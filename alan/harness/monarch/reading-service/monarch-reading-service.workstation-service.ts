import type { WorkstationService } from "akasha/services/workstation-services/workstation-service.page-type.types.ts"

export const monarchReadingService = {
  id: "01a05b42-a2d3-7d02-b6b1-5faa28a7bdba",
  pageTypeSlug: "workstation-service",
  type: "workstation-service",
  slug: "monarch-reading-service",
  definition: "the service taking Monarch's unreviewed count onto its readout",
  runs: ["bun alan/harness/monarch/reading/monarch-reading.module.code.ts"],
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*:0/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
} as const satisfies WorkstationService
