import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const sleepRelayService = {
  id: "01a06220-ef8c-7a3e-a40b-06bc3fc01541",
  pageTypeSlug: "service-workstation",
  type: "service-workstation",
  slug: "sleep-relay-service",
  definition: "the service carrying the sleep hours to the sites that show them",
  runs: [
    "-bun alan/harness/readouts/relay/readout-relay.module.code.ts alan/harness/readouts/pages/upkeep-sleep/upkeep-sleep.readout.ts https://alanwalton.com",
    "-bun alan/harness/readouts/relay/readout-relay.module.code.ts alan/harness/readouts/pages/upkeep-sleep/upkeep-sleep.readout.ts https://smilingjenny.me",
  ],
  starts: [
    {
      code: "module/readout-relay",
      pages: ["readout/upkeep-sleep"],
      arguments: ["https://alanwalton.com"],
      lenient: true,
    },
    {
      code: "module/readout-relay",
      pages: ["readout/upkeep-sleep"],
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
