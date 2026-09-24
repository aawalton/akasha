import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const modelAccountUpkeepStall = {
  id: "01a06829-0194-773b-982b-dd8a10714450",
  type: "page-type/service-workstation",
  slug: "model-account-upkeep-stall",
  definition: "the service ruling on whether Claude account upkeep has stalled and telling Alan",
  enabled: true,
  systemd: {
    schedule: "*:0/30",
    catchUp: true,
    startTimeoutSeconds: 120,
  },
  told: false,
} as const satisfies ServiceWorkstation
