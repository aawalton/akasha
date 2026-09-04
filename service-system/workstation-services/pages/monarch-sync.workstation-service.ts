import type { WorkstationService } from "../workstation-service.page-type.ts"

export const monarchSync = {
  id: "01a06829-0194-7976-b3a8-db7df0bae3ef",
  pageTypeSlug: "workstation-service",
  slug: "monarch-sync",
  definition: "the service copying the whole of Monarch and comparing the copy against it",
  runs: ["bun alan/harness/monarch/monarch-syncing/monarch-syncing.module.code.ts"],
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "daily",
    jitterSeconds: 1800,
    catchUp: true,
    startTimeoutSeconds: 3600,
  },
} as const satisfies WorkstationService
