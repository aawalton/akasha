import type { WorkstationService } from "@akasha/service-system/workstation-service"

export const sleepRelayService = {
  id: "01a06220-ef8c-7a3e-a40b-06bc3fc01541",
  pageTypeSlug: "workstation-service",
  slug: "sleep-relay-service",
  definition: "the service carrying the sleep hours to the sites that show them",
  runs: [
    "-bun readout-system/readout-relay/readout-relay.module.code.ts readout-system/readouts/pages/upkeep-sleep/upkeep-sleep.readout.ts https://alanwalton.com",
    "-bun readout-system/readout-relay/readout-relay.module.code.ts readout-system/readouts/pages/upkeep-sleep/upkeep-sleep.readout.ts https://smilingjenny.me",
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
