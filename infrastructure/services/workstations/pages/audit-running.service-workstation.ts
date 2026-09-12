import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const auditRunning = {
  id: "01a091e9-689c-7002-afcc-8b73def2b8f9",
  type: "service-workstation",
  slug: "audit-running",
  definition: "the service running each check's audit and telling thea what turned red",
  runs: ["bun checks/modules/audit-serving/audit-serving.module.code.ts"],
  starts: [{ code: "module/audit-serving" }],
  enabled: true,
  needsSecrets: false,
  systemd: {
    schedule: "hourly",
    jitterSeconds: 300,
    catchUp: true,
    startTimeoutSeconds: 21600,
  },
} as const satisfies ServiceWorkstation
