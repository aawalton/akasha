import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const sweepCostRecords = {
  id: "01a09b34-9cf2-7d06-8d66-b835be4f7ebd",
  type: "page-type/service-workstation",
  slug: "sweep-cost-records",
  definition: "the service removing every line beside a page past the window its property states",
  enabled: true,
  systemd: {
    schedule: "daily",
    jitterSeconds: 600,
    startTimeoutSeconds: 900,
  },
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run of this service stopped partway is a refusal rather than a run that is done.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sweep hears the stop itself, because the unit reads a stop alone as success.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The memory reaper stops what it takes before killing it, which is what is heard.",
    },
  ],
  createdAt: "2026-09-13T14:38:31.666Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceWorkstation
