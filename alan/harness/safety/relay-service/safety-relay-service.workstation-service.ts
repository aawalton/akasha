import type { WorkstationService } from "akasha/services/workstation-services/workstation-service.page-type.types.ts"

export const safetyRelayService = {
  id: "01a05f4d-1a20-7000-9c31-6de0f0f4a1b2",
  pageTypeSlug: "workstation-service",
  type: "workstation-service",
  slug: "safety-relay-service",
  definition: "the service carrying the safety level to the sites that show it",
  runs: [
    "-bun alan/harness/readouts/relay/readout-relay.module.code.ts alan/harness/readouts/pages/upkeep-safety/upkeep-safety.readout.ts https://alanwalton.com",
    "-bun alan/harness/readouts/relay/readout-relay.module.code.ts alan/harness/readouts/pages/upkeep-safety/upkeep-safety.readout.ts https://smilingjenny.me",
  ],
  starts: [
    {
      code: "module/readout-relay",
      pages: ["readout/upkeep-safety"],
      arguments: ["https://alanwalton.com"],
      lenient: true,
    },
    {
      code: "module/readout-relay",
      pages: ["readout/upkeep-safety"],
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
} as const satisfies WorkstationService
