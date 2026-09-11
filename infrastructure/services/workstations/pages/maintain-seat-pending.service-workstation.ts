import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const maintainSeatPending = {
  id: "01a026aa-c443-7000-8636-7a36d8bbf564",
  pageTypeSlug: "service-workstation",
  type: "service-workstation",
  slug: "maintain-seat-pending",
  definition:
    "the service keeping each seat's pending parts true between one turn end and the next",
  runs: ["bun seat-system/seat-pending/pending-maintaining/pending-maintaining.module.code.ts"],
  starts: [{ code: "module/pending-maintaining" }],
  enabled: true,
  systemd: {
    restartDelaySeconds: 10,
  },
} as const satisfies ServiceWorkstation
