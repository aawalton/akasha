import type { ServiceWorkstation } from "akasha/services/workstations/service-workstation.page-type.types.ts"

export const monarchPoll = {
  id: "01a06829-0194-7a16-9864-72598a2e5654",
  pageTypeSlug: "service-workstation",
  type: "service-workstation",
  slug: "monarch-poll",
  definition: "the service landing the Monarch rows whose update time has moved",
  runs: ["bun alan/harness/monarch/transaction-polling/transaction-polling.module.code.ts"],
  starts: [{ code: "module/transaction-polling" }],
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "minutely",
    jitterSeconds: 10,
    accuracySeconds: 1,
    startTimeoutSeconds: 300,
  },
} as const satisfies ServiceWorkstation
