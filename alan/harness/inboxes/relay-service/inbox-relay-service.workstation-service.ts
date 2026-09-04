import type { WorkstationService } from "@akasha/service-system/workstation-service"

export const inboxRelayService = {
  id: "01a06230-b156-7667-b81e-d7a74183ae8d",
  pageTypeSlug: "workstation-service",
  slug: "inbox-relay-service",
  definition: "the service carrying the inbox counts to the site that shows them",
  runs: [
    "-bun readout-system/readout-relay/readout-relay.module.code.ts readout-system/readouts/pages/inboxes-email/inboxes-email.readout.ts https://alanwalton.com",
    "-bun readout-system/readout-relay/readout-relay.module.code.ts readout-system/readouts/pages/inboxes-tasks/inboxes-tasks.readout.ts https://alanwalton.com",
    "-bun readout-system/readout-relay/readout-relay.module.code.ts temper/temper-progress/readouts/inboxes-temper-tasks/inboxes-temper-tasks.readout.ts https://alanwalton.com",
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
