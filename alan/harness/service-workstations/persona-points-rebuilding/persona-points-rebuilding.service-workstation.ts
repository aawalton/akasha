import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const personaPointsRebuilding = {
  id: "01a082eb-b037-7fe2-b2ad-f45181c80cb2",
  type: "page-type/service-workstation",
  slug: "persona-points-rebuilding",
  definition: "the service that counts the points of each persona when a day opens",
  enabled: true,
  systemd: {
    schedule: "*-*-* 04:10:00",
    catchUp: true,
    startTimeoutSeconds: 600,
  },
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The timer fires after the day has opened rather than as the day opens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Four in the morning in Denver is six in the morning in New York all year.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run missed while the workstation was off runs when the workstation is back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Without this run a day turning would leave each persona with today's count alone.",
    },
  ],
  createdAt: "2026-09-08T21:27:59.287Z",
  updatedAt: "2026-10-30T16:10:55.169Z",
} as const satisfies ServiceWorkstation
