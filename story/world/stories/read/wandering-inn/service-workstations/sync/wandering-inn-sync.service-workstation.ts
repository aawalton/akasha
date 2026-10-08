import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const wanderingInnSync = {
  id: "01a06829-0194-7944-8222-878e84344e48",
  type: "page-type/service-workstation",
  slug: "wandering-inn-sync",
  definition: "the service filing each new Wandering Inn chapter as a page",
  enabled: true,
  needsSecrets: false,
  systemd: {
    schedule: "*-*-* 07:40:00",
    jitterSeconds: 300,
    catchUp: true,
    startTimeoutSeconds: 10800,
  },
  createdAt: "2026-09-03T16:45:12.980Z",
  updatedAt: "2026-09-25T15:48:35.000Z",
} as const satisfies ServiceWorkstation
