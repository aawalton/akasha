import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const plantsRelayService = {
  id: "01a06221-d65f-71c6-9f1e-446dff470034",
  pageTypeSlug: "service-workstation",
  type: "service-workstation",
  slug: "plants-relay-service",
  definition: "the service carrying the plant grams to the sites that show them",
  runs: [
    "-bun alan/harness/readouts/relay/readout-relay.module.code.ts alan/harness/readouts/pages/upkeep-plants/upkeep-plants.readout.ts https://alanwalton.com",
    "-bun alan/harness/readouts/relay/readout-relay.module.code.ts alan/harness/readouts/pages/upkeep-plants/upkeep-plants.readout.ts https://smilingjenny.me",
  ],
  starts: [
    {
      code: "module/readout-relay",
      pages: ["readout/upkeep-plants"],
      arguments: ["https://alanwalton.com"],
      lenient: true,
    },
    {
      code: "module/readout-relay",
      pages: ["readout/upkeep-plants"],
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
