import type { WorkstationService } from "../workstation-service.page-type.ts"

export const royalRoadSync = {
  id: "01a06829-0194-78d3-8693-e4cc1c1e6e9a",
  pageTypeSlug: "workstation-service",
  slug: "royal-road-sync",
  definition: "the service syncing Royal Road chapters",
  runs: [
    "flock -n /var/tmp/royal-road-sync.lock bun akasha/collection-system/royal-road/royal-road-syncing/royal-road-syncing.module.code.ts --commit",
  ],
  enabled: true,
  needsSecrets: false,
  systemd: {
    schedule: "hourly",
    jitterSeconds: 300,
    catchUp: true,
    startTimeoutSeconds: 21600,
  },
} as const satisfies WorkstationService
