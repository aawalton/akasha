import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const monarchSync = {
  id: "01a06829-0194-7976-b3a8-db7df0bae3ef",
  type: "service-workstation",
  slug: "monarch-sync",
  definition: "the service copying the whole of Monarch and comparing the copy against it",
  runs: ["bun alan/harness/monarch/syncing/monarch-syncing.module.code.ts"],
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "daily",
    jitterSeconds: 1800,
    catchUp: true,
    startTimeoutSeconds: 3600,
  },
} as const satisfies ServiceWorkstation
