import type { WorkstationService } from "akasha/services/workstation-services/workstation-service.page-type.ts"

export const sleepRelayService = {
  id: "01a06220-ef8c-7a3e-a40b-06bc3fc01541",
  pageTypeSlug: "workstation-service",
  type: "workstation-service",
  slug: "sleep-relay-service",
  definition: "the service carrying the sleep hours to the sites that show them",
  runs: [
    "-bun readouts/relay/readout-relay.module.code.ts readouts/pages/upkeep-sleep/upkeep-sleep.readout.ts https://alanwalton.com",
    "-bun readouts/relay/readout-relay.module.code.ts readouts/pages/upkeep-sleep/upkeep-sleep.readout.ts https://smilingjenny.me",
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
