import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

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
  createdAt: "2026-08-21T23:32:00.707Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceWorkstation
