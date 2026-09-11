import type { ServiceWorkstation } from "akasha/services/workstations/service-workstation.page-type.types.ts"

export const capacityRelayService = {
  id: "01a06230-614f-7c7a-b4f2-d985546de7af",
  pageTypeSlug: "service-workstation",
  type: "service-workstation",
  slug: "capacity-relay-service",
  definition: "the service carrying the capacity hours to the sites that show them",
  runs: [
    "-bun alan/harness/readouts/relay/readout-relay.module.code.ts alan/harness/readouts/pages/upkeep-capacity/upkeep-capacity.readout.ts https://alanwalton.com",
    "-bun alan/harness/readouts/relay/readout-relay.module.code.ts alan/harness/readouts/pages/upkeep-capacity/upkeep-capacity.readout.ts https://smilingjenny.me",
  ],
  starts: [
    {
      code: "module/readout-relay",
      pages: ["readout/upkeep-capacity"],
      arguments: ["https://alanwalton.com"],
      lenient: true,
    },
    {
      code: "module/readout-relay",
      pages: ["readout/upkeep-capacity"],
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
