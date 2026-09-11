import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const inboxRelayService = {
  id: "01a06230-b156-7667-b81e-d7a74183ae8d",
  type: "service-workstation",
  slug: "inbox-relay-service",
  definition: "the service carrying the inbox counts to the site that shows them",
  runs: [
    "-bun alan/harness/readouts/relay/readout-relay.module.code.ts alan/harness/readouts/pages/inboxes-email/inboxes-email.readout.ts https://alanwalton.com",
    "-bun alan/harness/readouts/relay/readout-relay.module.code.ts alan/harness/readouts/pages/inboxes-tasks/inboxes-tasks.readout.ts https://alanwalton.com",
    "-bun alan/harness/readouts/relay/readout-relay.module.code.ts temper/progressions/inboxes-temper-tasks/inboxes-temper-tasks.readout.ts https://alanwalton.com",
  ],
  starts: [
    {
      code: "module/readout-relay",
      pages: ["readout/inboxes-email"],
      arguments: ["https://alanwalton.com"],
      lenient: true,
    },
    {
      code: "module/readout-relay",
      pages: ["readout/inboxes-tasks"],
      arguments: ["https://alanwalton.com"],
      lenient: true,
    },
    {
      code: "module/readout-relay",
      pages: ["readout/inboxes-temper-tasks"],
      arguments: ["https://alanwalton.com"],
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
} as const satisfies ServiceWorkstation
