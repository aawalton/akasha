import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const monarchRelayService = {
  id: "01a05b53-8d92-7100-a247-0189479aee94",
  type: "service-workstation",
  slug: "monarch-relay-service",
  definition: "the service carrying the unreviewed reading to the sites that show it",
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*:2/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
} as const satisfies ServiceWorkstation
