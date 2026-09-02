import type { WorkstationService } from "@akasha/service-system/workstation-service"

export const monarchRelayService = {
  id: "01a05b53-8d92-7100-a247-0189479aee94",
  pageTypeSlug: "workstation-service",
  slug: "monarch-relay-service",
  definition: "the service carrying the unreviewed reading to the sites that show it",
  runs: [
    "-bun akasha/readout-system/readout-relay/readout-relay.module.code.ts akasha/readout-system/readouts/pages/monarch-unreviewed-transactions/monarch-unreviewed-transactions.readout.ts https://alanwalton.com",
    "-bun akasha/readout-system/readout-relay/readout-relay.module.code.ts akasha/readout-system/readouts/pages/monarch-unreviewed-transactions/monarch-unreviewed-transactions.readout.ts https://smilingjenny.me",
  ],
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*:2/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
} as const satisfies WorkstationService
