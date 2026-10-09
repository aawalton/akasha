import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const onCompleteRunning = {
  id: "01a1209a-6265-73c3-8864-89ec6aae13c0",
  type: "page-type/service-workstation",
  slug: "on-complete-running",
  definition:
    "the service running each to-do's on-complete code once that to-do is newly completed",
  enabled: true,
  systemd: {
    schedule: "*:*:00",
    startTimeoutSeconds: 600,
  },
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The timer fires each minute, so a completion runs its code within about a minute.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A completion made while the workstation was off runs its code at the next tick.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick with no new completion loads no to-do's code.",
    },
  ],
  createdAt: "2026-10-09T12:19:11.076Z",
  updatedAt: "2026-10-09T12:19:11.076Z",
} as const satisfies ServiceWorkstation
