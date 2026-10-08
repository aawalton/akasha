import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const inferenceWatching = {
  id: "01a0d973-be39-7f11-82fe-11a3169cac7f",
  type: "page-type/service-workstation",
  slug: "inference-watching",
  definition: "the service looking at whether each inference service answers on its host",
  enabled: true,
  systemd: {
    schedule: "*:0/5",
    jitterSeconds: 5,
    startTimeoutSeconds: 120,
  },
  createdAt: "2026-09-25T16:43:56.345Z",
  updatedAt: "2026-09-25T16:44:18.000Z",
} as const satisfies ServiceWorkstation
