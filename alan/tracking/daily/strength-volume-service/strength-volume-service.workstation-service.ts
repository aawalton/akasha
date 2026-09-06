import type { WorkstationService } from "@akasha/service-system/workstation-service"

export const strengthVolumeService = {
  id: "01a07771-cd58-72ba-b499-464a13dc49ef",
  pageTypeSlug: "workstation-service",
  slug: "strength-volume-service",
  definition: "the service writing the weight Alan moved onto the days he moved it",
  runs: ["bun alan/tracking/daily/strength-points/strength-points.module.code.ts"],
  enabled: true,
  systemd: {
    schedule: "*:0/10",
    jitterSeconds: 30,
    startTimeoutSeconds: 300,
    catchUp: false,
  },
} as const satisfies WorkstationService
