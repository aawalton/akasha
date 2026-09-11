import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const monarchRelayService = {
  id: "01a05b53-8d92-7100-a247-0189479aee94",
  pageTypeSlug: "service-workstation",
  type: "service-workstation",
  slug: "monarch-relay-service",
  definition: "the service carrying the unreviewed reading to the sites that show it",
  runs: [
    "-bun alan/harness/readouts/relay/readout-relay.module.code.ts alan/harness/readouts/pages/monarch-unreviewed-transactions/monarch-unreviewed-transactions.readout.ts https://alanwalton.com",
    "-bun alan/harness/readouts/relay/readout-relay.module.code.ts alan/harness/readouts/pages/monarch-unreviewed-transactions/monarch-unreviewed-transactions.readout.ts https://smilingjenny.me",
  ],
  starts: [
    {
      code: "module/readout-relay",
      pages: ["readout/monarch-unreviewed-transactions"],
      arguments: ["https://alanwalton.com"],
      lenient: true,
    },
    {
      code: "module/readout-relay",
      pages: ["readout/monarch-unreviewed-transactions"],
      arguments: ["https://smilingjenny.me"],
      lenient: true,
    },
  ],
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*:2/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
} as const satisfies ServiceWorkstation
