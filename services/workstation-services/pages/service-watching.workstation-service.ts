import type { WorkstationService } from "../workstation-service.page-type.ts"

export const serviceWatching = {
  id: "01a0821e-fce7-7ae4-8976-65f19bcdb30b",
  pageTypeSlug: "workstation-service",
  type: "workstation-service",
  slug: "service-watching",
  definition: "the service telling a persona that a service she answers for is broken",
  runs: ["bun services/workstation-services/service-watching/service-watching.module.code.ts"],
  enabled: true,
  systemd: {
    schedule: "*:*:00",
    jitterSeconds: 5,
    startTimeoutSeconds: 120,
  },
} as const satisfies WorkstationService
