import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const sweepLogDays = {
  id: "01a03b2f-4e21-7000-b7c5-1d9a4e3f8a60",
  pageTypeSlug: "service-workstation",
  type: "service-workstation",
  slug: "sweep-log-days",
  definition: "the service removing every log day past the window a log is kept for",
  runs: ["bun seat-system/seat-log-days/log-day-sweeping/log-day-sweeping.module.code.ts --remove"],
  starts: [{ code: "module/log-day-sweeping", arguments: ["--remove"] }],
  enabled: true,
  systemd: {
    schedule: "daily",
    jitterSeconds: 600,
    startTimeoutSeconds: 900,
  },
} as const satisfies ServiceWorkstation
