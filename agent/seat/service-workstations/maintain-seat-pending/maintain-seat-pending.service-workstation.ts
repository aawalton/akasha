import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const maintainSeatPending = {
  id: "01a026aa-c443-7000-8636-7a36d8bbf564",
  type: "page-type/service-workstation",
  slug: "maintain-seat-pending",
  definition: "the service that writes whether each seat waits when a file changes",
  enabled: true,
  systemd: {
    restartDelaySeconds: 10,
  },
  told: false,
  createdAt: "2026-08-21T23:32:00.707Z",
  updatedAt: "2026-10-30T14:44:49.944Z",
} as const satisfies ServiceWorkstation
