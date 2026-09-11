import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const monarchReadingService = {
  id: "01a05b42-a2d3-7d02-b6b1-5faa28a7bdba",
  type: "service-workstation",
  slug: "monarch-reading-service",
  definition: "the service taking Monarch's unreviewed count onto its readout",
  runs: ["bun alan/harness/monarch/reading/monarch-reading.module.code.ts"],
  starts: [{ code: "module/monarch-reading" }],
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*:0/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
} as const satisfies ServiceWorkstation
