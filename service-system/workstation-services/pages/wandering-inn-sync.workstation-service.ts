import type { WorkstationService } from "../workstation-service.page-type.ts"

export const wanderingInnSync = {
  id: "01a06829-0194-7944-8222-878e84344e48",
  pageTypeSlug: "workstation-service",
  slug: "wandering-inn-sync",
  definition: "the service filing each new Wandering Inn chapter as a page",
  runs: [
    "flock -n /var/tmp/wandering-inn-sync.lock bun story/wandering-inn/syncing/syncing.module.code.ts",
  ],
  enabled: true,
  needsSecrets: false,
  systemd: {
    schedule: "*-*-* 07:40:00",
    jitterSeconds: 300,
    catchUp: true,
    startTimeoutSeconds: 10800,
  },
} as const satisfies WorkstationService
