import type { WorkstationService } from "../workstation-service.page-type.ts"

export const sweepLogDays = {
  id: "01a03b2f-4e21-7000-b7c5-1d9a4e3f8a60",
  pageTypeSlug: "workstation-service",
  slug: "sweep-log-days",
  definition: "the service removing every log day past the window a log is kept for",
  runs: ["bun services/sweep-log-days.ts --remove"],
  enabled: true,
  systemd: {
    schedule: "daily",
    jitterSeconds: 600,
    startTimeoutSeconds: 900,
  },
} as const satisfies WorkstationService
