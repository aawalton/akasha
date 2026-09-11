import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const serviceWatching = {
  id: "01a0821e-fce7-7ae4-8976-65f19bcdb30b",
  pageTypeSlug: "service-workstation",
  type: "service-workstation",
  slug: "service-watching",
  definition: "the service telling a persona that a service she answers for is broken",
  runs: [
    "bun infrastructure/services/workstations/service-watching/service-watching.module.code.ts",
  ],
  starts: [{ code: "module/service-watching" }],
  enabled: true,
  systemd: {
    schedule: "*:*:00",
    jitterSeconds: 5,
    startTimeoutSeconds: 120,
  },
  deployedCommit: "c1535d315a7637462607486074d6574063b98f88",
} as const satisfies ServiceWorkstation
