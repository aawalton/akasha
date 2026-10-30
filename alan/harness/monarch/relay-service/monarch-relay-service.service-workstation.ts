import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const monarchRelayService = {
  id: "01a05b53-8d92-7100-a247-0189479aee94",
  type: "page-type/service-workstation",
  slug: "monarch-relay-service",
  definition:
    "the service that sends the numbers of a Monarch readout to the router apps that show the readout",
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*:2/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
  createdAt: "2026-09-01T04:56:37.522Z",
  updatedAt: "2026-10-30T16:59:46.144Z",
} as const satisfies ServiceWorkstation
