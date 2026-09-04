import type { WorkstationService } from "@akasha/service-system/workstation-service"

export const surplusRelayService = {
  id: "01a05fc3-145a-7083-9cec-6a873c631afe",
  pageTypeSlug: "workstation-service",
  slug: "surplus-relay-service",
  definition: "the service carrying the surplus hours to the sites that show them",
  runs: [
    "-bun readout-system/readout-relay/readout-relay.module.code.ts readout-system/readouts/pages/upkeep-surplus/upkeep-surplus.readout.ts https://alanwalton.com",
    "-bun readout-system/readout-relay/readout-relay.module.code.ts readout-system/readouts/pages/upkeep-surplus/upkeep-surplus.readout.ts https://smilingjenny.me",
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
