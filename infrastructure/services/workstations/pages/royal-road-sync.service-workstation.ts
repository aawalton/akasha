import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const royalRoadSync = {
  id: "01a06829-0194-78d3-8693-e4cc1c1e6e9a",
  type: "service-workstation",
  slug: "royal-road-sync",
  definition: "the service syncing Royal Road chapters",
  runs: [
    "flock -n /var/tmp/royal-road-sync.lock bun alan/collections/royal-road/syncing/royal-road-syncing.module.code.ts --commit",
  ],
  starts: [
    {
      before: ["flock", "-n", "/var/tmp/royal-road-sync.lock"],
      code: "module/royal-road-syncing",
      arguments: ["--commit"],
    },
  ],
  enabled: true,
  needsSecrets: false,
  systemd: {
    schedule: "hourly",
    jitterSeconds: 300,
    catchUp: true,
    startTimeoutSeconds: 21600,
  },
} as const satisfies ServiceWorkstation
