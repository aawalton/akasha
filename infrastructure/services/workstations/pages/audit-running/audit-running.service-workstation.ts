import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const auditRunning = {
  id: "01a091e9-689c-7002-afcc-8b73def2b8f9",
  type: "service-workstation",
  slug: "audit-running",
  definition:
    "the service running each check's audit and telling whoever champions checks what turned red",
  enabled: true,
  needsSecrets: false,
  systemd: {
    schedule: "hourly",
    jitterSeconds: 300,
    catchUp: true,
    startTimeoutSeconds: 21600,
  },
} as const satisfies ServiceWorkstation
