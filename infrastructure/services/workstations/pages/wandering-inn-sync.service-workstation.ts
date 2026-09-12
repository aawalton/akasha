import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const wanderingInnSync = {
  id: "01a06829-0194-7944-8222-878e84344e48",
  type: "service-workstation",
  slug: "wandering-inn-sync",
  definition: "the service filing each new Wandering Inn chapter as a page",
  runs: ["bun story/wandering-inn/syncing/syncing.module.code.ts"],
  starts: [{ code: "module/syncing" }],
  enabled: true,
  needsSecrets: false,
  systemd: {
    schedule: "*-*-* 07:40:00",
    jitterSeconds: 300,
    catchUp: true,
    startTimeoutSeconds: 10800,
  },
} as const satisfies ServiceWorkstation
