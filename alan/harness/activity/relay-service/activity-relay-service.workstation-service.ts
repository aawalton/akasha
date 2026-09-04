import type { WorkstationService } from "@akasha/service-system/workstation-service"

export const activityRelayService = {
  id: "01a06222-9828-77f2-adbb-5b83d7528e2d",
  pageTypeSlug: "workstation-service",
  slug: "activity-relay-service",
  definition: "the service carrying the activity calories to the sites that show them",
  runs: [
    "-bun readout-system/readout-relay/readout-relay.module.code.ts readout-system/readouts/pages/upkeep-activity/upkeep-activity.readout.ts https://alanwalton.com",
    "-bun readout-system/readout-relay/readout-relay.module.code.ts readout-system/readouts/pages/upkeep-activity/upkeep-activity.readout.ts https://smilingjenny.me",
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
