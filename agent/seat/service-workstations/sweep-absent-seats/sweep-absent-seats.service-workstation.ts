import type { ServiceWorkstation } from "akasha/infrastructure/service/workstation/service-workstation.page-type.types.ts"

export const sweepAbsentSeats = {
  id: "01a0b716-cdc9-793e-85f4-3702945b30d5",
  type: "page-type/service-workstation",
  slug: "sweep-absent-seats",
  definition: "the service ending every seat whose agent is gone",
  enabled: true,
  systemd: {
    restartDelaySeconds: 10,
  },
  told: false,
} as const satisfies ServiceWorkstation
