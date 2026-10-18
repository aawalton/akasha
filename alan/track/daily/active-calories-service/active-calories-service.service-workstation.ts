import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const activeCaloriesService = {
  id: "01a07724-a486-7717-8141-ae09cdb04434",
  type: "page-type/service-workstation",
  slug: "active-calories-service",
  definition: "the service writing the calories Alan burned moving onto the days he burned them",
  enabled: true,
  systemd: {
    restart: "on-failure",
    restartDelaySeconds: 5,
    startLimitIntervalSeconds: 0,
  },
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The unit running the watch is simple rather than a timer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Repeated starts are counted over no window.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No timer sweeps the days, since the watch writes them as it starts.",
    },
  ],
  createdAt: "2026-09-06T14:34:45.254Z",
  updatedAt: "2026-10-18T15:31:01.166Z",
} as const satisfies ServiceWorkstation
