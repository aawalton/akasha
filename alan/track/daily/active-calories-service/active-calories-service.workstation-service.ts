import type { WorkstationService } from "@akasha/service/workstation-service"

export const activeCaloriesService = {
  id: "01a07724-a486-7717-8141-ae09cdb04434",
  pageTypeSlug: "workstation-service",
  type: "workstation-service",
  slug: "active-calories-service",
  definition: "the service writing the calories Alan burned moving onto the days he burned them",
  runs: ["bun alan/track/daily/day-active-calories/day-active-calories.module.code.ts"],
  enabled: true,
  systemd: {
    schedule: "*:0/10",
    jitterSeconds: 30,
    startTimeoutSeconds: 300,
    catchUp: false,
  },
} as const satisfies WorkstationService
