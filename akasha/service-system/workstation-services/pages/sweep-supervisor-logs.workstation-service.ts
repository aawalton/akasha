import type { WorkstationService } from "../workstation-service.page-type.ts"

export const sweepSupervisorLogs = {
  id: "01a033a4-98c1-7167-9e3e-387829512ba6",
  pageTypeSlug: "workstation-service",
  slug: "sweep-supervisor-logs",
  definition: "the service removing the log directory of every supervisor whose seat is gone",
  runs: ["bun services/sweep-supervisor-logs.ts --remove"],
  enabled: true,
  systemd: {
    schedule: "daily",
    jitterSeconds: 600,
    startTimeoutSeconds: 900,
  },
} as const satisfies WorkstationService
