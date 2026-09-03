import type { WorkstationService } from "../workstation-service.page-type.ts"

export const monarchPoll = {
  id: "01a06829-0194-7a16-9864-72598a2e5654",
  pageTypeSlug: "workstation-service",
  slug: "monarch-poll",
  definition: "the service landing the Monarch rows whose update time has moved",
  runs: ["bun akasha/alan/harness/monarch/transaction-polling/transaction-polling.module.code.ts"],
  enabled: true,
  systemd: {
    schedule: "minutely",
    jitterSeconds: 10,
    accuracySeconds: 1,
    startTimeoutSeconds: 300,
  },
} as const satisfies WorkstationService
