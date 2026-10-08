import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const sweepSupervisorLogs = {
  id: "01a033a4-98c1-7167-9e3e-387829512ba6",
  type: "page-type/service-workstation",
  slug: "sweep-supervisor-logs",
  definition: "the service removing the log directory of every supervisor whose seat is gone",
  enabled: true,
  systemd: {
    schedule: "daily",
    jitterSeconds: 600,
    startTimeoutSeconds: 900,
  },
  told: false,
  createdAt: "2026-08-24T12:00:20.161Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceWorkstation
