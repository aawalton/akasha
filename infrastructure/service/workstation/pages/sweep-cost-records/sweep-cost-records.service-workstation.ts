import type { ServiceWorkstation } from "akasha/infrastructure/service/workstation/service-workstation.page-type.types.ts"

export const sweepCostRecords = {
  id: "01a09b34-9cf2-7d06-8d66-b835be4f7ebd",
  type: "service-workstation",
  slug: "sweep-cost-records",
  definition: "the service removing every line beside a page past the window its property states",
  enabled: true,
  systemd: {
    schedule: "daily",
    jitterSeconds: 600,
    startTimeoutSeconds: 900,
  },
} as const satisfies ServiceWorkstation
