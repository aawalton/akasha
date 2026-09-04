import type { WorkstationService } from "@akasha/service-system/workstation-service"

export const safetyRelayService = {
  id: "01a05f4d-1a20-7000-9c31-6de0f0f4a1b2",
  pageTypeSlug: "workstation-service",
  slug: "safety-relay-service",
  definition: "the service carrying the safety level to the sites that show it",
  runs: [
    "-bun akasha/readout-system/readout-relay/readout-relay.module.code.ts akasha/readout-system/readouts/pages/upkeep-safety/upkeep-safety.readout.ts https://alanwalton.com",
    "-bun akasha/readout-system/readout-relay/readout-relay.module.code.ts akasha/readout-system/readouts/pages/upkeep-safety/upkeep-safety.readout.ts https://smilingjenny.me",
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
