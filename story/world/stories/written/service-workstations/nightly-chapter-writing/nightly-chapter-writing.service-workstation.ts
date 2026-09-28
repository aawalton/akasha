import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const nightlyChapterWriting = {
  id: "01a0e99c-93f4-7f3a-86ac-760f73f5563b",
  type: "page-type/service-workstation",
  slug: "nightly-chapter-writing",
  definition:
    "the service starting each night the next chapter of every written story read through",
  enabled: true,
  systemd: {
    schedule: "*-*-* 03:00:00",
    catchUp: true,
    startTimeoutSeconds: 600,
  },
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The timer fires at three in the morning in Denver.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run missed while the workstation was off runs when the workstation is back.",
    },
  ],
} as const satisfies ServiceWorkstation
