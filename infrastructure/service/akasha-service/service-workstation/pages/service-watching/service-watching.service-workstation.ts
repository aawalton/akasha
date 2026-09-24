import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const serviceWatching = {
  id: "01a0821e-fce7-7ae4-8976-65f19bcdb30b",
  type: "page-type/service-workstation",
  slug: "service-watching",
  definition: "the service telling a persona that a service she answers for is broken",
  enabled: true,
  systemd: {
    schedule: "*:*:00",
    jitterSeconds: 5,
    startTimeoutSeconds: 120,
  },
} as const satisfies ServiceWorkstation
