import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const modelAccountUpkeepService = {
  id: "01a06829-0194-744a-b8fe-cd24f9fcdcc1",
  type: "page-type/service-workstation",
  slug: "model-account-upkeep-service",
  definition: "the service renewing each Claude account's token and reading its usage every hour",
  enabled: true,
  systemd: {
    restartDelaySeconds: 10,
  },
  told: false,
  createdAt: "2026-09-03T16:45:12.980Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceWorkstation
