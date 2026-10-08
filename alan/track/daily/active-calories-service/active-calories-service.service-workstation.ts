import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const activeCaloriesService = {
  id: "01a07724-a486-7717-8141-ae09cdb04434",
  type: "page-type/service-workstation",
  slug: "active-calories-service",
  definition: "the service writing the calories Alan burned moving onto the days he burned them",
  enabled: true,
  systemd: {
    schedule: "*:0/10",
    jitterSeconds: 30,
    startTimeoutSeconds: 300,
    catchUp: false,
  },
  createdAt: "2026-09-06T14:34:45.254Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceWorkstation
