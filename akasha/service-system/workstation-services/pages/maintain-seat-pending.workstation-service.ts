import type { WorkstationService } from "../workstation-service.page-type.ts"

export const maintainSeatPending = {
  id: "01a026aa-c443-7000-8636-7a36d8bbf564",
  pageTypeSlug: "workstation-service",
  slug: "maintain-seat-pending",
  definition:
    "the service keeping each seat's pending parts true between one turn end and the next",
  runs: [
    "bun akasha/seat-system/seat-pending/pending-maintaining/pending-maintaining.module.code.ts",
  ],
  enabled: true,
  systemd: {
    restartDelaySeconds: 10,
  },
} as const satisfies WorkstationService
