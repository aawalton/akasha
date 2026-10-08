import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const alanEmailWorker = {
  id: "01a06829-0193-7263-a1e4-d14db047d74d",
  type: "page-type/service-workstation",
  slug: "alan-email-worker",
  definition: "the service deciding Alan's mail against his email rules",
  enabled: true,
  needsSecrets: true,
  systemd: {
    restartDelaySeconds: 10,
  },
  createdAt: "2026-09-03T16:45:12.979Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceWorkstation
