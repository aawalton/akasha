import type { ServiceWorkstation } from "akasha/infrastructure/service/workstation/service-workstation.page-type.types.ts"

export const maintainSeatPending = {
  id: "01a026aa-c443-7000-8636-7a36d8bbf564",
  type: "page-type/service-workstation",
  slug: "maintain-seat-pending",
  definition: "the service keeping each seat's pending parts true between a turn end and the next",
  enabled: true,
  systemd: {
    restartDelaySeconds: 10,
  },
  told: false,
} as const satisfies ServiceWorkstation
