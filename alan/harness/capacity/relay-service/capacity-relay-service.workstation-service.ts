import type { WorkstationService } from "@akasha/service-system/workstation-service"

export const capacityRelayService = {
  id: "01a06230-614f-7c7a-b4f2-d985546de7af",
  pageTypeSlug: "workstation-service",
  slug: "capacity-relay-service",
  definition: "the service carrying the capacity hours to the sites that show them",
  runs: [
    "-bun readout-system/readout-relay/readout-relay.module.code.ts readout-system/readouts/pages/upkeep-capacity/upkeep-capacity.readout.ts https://alanwalton.com",
    "-bun readout-system/readout-relay/readout-relay.module.code.ts readout-system/readouts/pages/upkeep-capacity/upkeep-capacity.readout.ts https://smilingjenny.me",
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
