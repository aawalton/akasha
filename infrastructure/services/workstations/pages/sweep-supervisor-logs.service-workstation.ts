import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const sweepSupervisorLogs = {
  id: "01a033a4-98c1-7167-9e3e-387829512ba6",
  type: "service-workstation",
  slug: "sweep-supervisor-logs",
  definition: "the service removing the log directory of every supervisor whose seat is gone",
  runs: [],
  enabled: true,
  systemd: {
    schedule: "daily",
    jitterSeconds: 600,
    startTimeoutSeconds: 900,
  },
} as const satisfies ServiceWorkstation
