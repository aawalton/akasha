import type { WorkstationService } from "@akasha/service-system/workstation-service"

export const plantsRelayService = {
  id: "01a06221-d65f-71c6-9f1e-446dff470034",
  pageTypeSlug: "workstation-service",
  slug: "plants-relay-service",
  definition: "the service carrying the plant grams to the sites that show them",
  runs: [
    "-bun readout-system/readout-relay/readout-relay.module.code.ts readout-system/readouts/pages/upkeep-plants/upkeep-plants.readout.ts https://alanwalton.com",
    "-bun readout-system/readout-relay/readout-relay.module.code.ts readout-system/readouts/pages/upkeep-plants/upkeep-plants.readout.ts https://smilingjenny.me",
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
