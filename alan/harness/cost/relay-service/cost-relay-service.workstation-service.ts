import type { WorkstationService } from "akasha/services/workstation-services/workstation-service.page-type.types.ts"

export const costRelayService = {
  id: "01a08b9e-9c00-7973-981e-e586a9afa38d",
  pageTypeSlug: "workstation-service",
  type: "workstation-service",
  slug: "cost-relay-service",
  definition: "the service carrying the cost to the sites that show it",
  runs: [
    "-bun readouts/relay/readout-relay.module.code.ts readouts/pages/cost-multiplier/cost-multiplier.readout.ts https://alanwalton.com",
    "-bun readouts/relay/readout-relay.module.code.ts readouts/pages/cost-multiplier/cost-multiplier.readout.ts https://smilingjenny.me",
  ],
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*:3/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
} as const satisfies WorkstationService
