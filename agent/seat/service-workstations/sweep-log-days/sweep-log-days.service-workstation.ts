import type { ServiceWorkstation } from "akasha/infrastructure/service/workstation/service-workstation.page-type.types.ts"

export const sweepLogDays = {
  id: "01a03b2f-4e21-7000-b7c5-1d9a4e3f8a60",
  type: "page-type/service-workstation",
  slug: "sweep-log-days",
  definition: "the service removing every log day past a log's window",
  enabled: true,
  systemd: {
    schedule: "daily",
    jitterSeconds: 600,
    startTimeoutSeconds: 900,
  },
  told: false,
} as const satisfies ServiceWorkstation
