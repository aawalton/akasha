import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const maintainSeatPending = {
  id: "01a026aa-c443-7000-8636-7a36d8bbf564",
  type: "service-workstation",
  slug: "maintain-seat-pending",
  definition:
    "the service keeping each seat's pending parts true between one turn end and the next",
  runs: [],
  enabled: true,
  systemd: {
    restartDelaySeconds: 10,
  },
} as const satisfies ServiceWorkstation
