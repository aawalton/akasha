import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const alanEmailWorker = {
  id: "01a06829-0193-7263-a1e4-d14db047d74d",
  type: "page-type/service-workstation",
  slug: "alan-email-worker",
  definition: "the service that handles new email in Alan's inbox",
  enabled: true,
  needsSecrets: true,
  systemd: {
    restartDelaySeconds: 10,
  },
  createdAt: "2026-09-03T16:45:12.979Z",
  updatedAt: "2026-10-30T15:36:25.626Z",
} as const satisfies ServiceWorkstation
