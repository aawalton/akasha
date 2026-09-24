import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const reminderSystem = {
  id: "01a05f42-d941-7000-8906-8852e706c156",
  type: "page-type/domain",
  slug: "reminder-system",
  definition: "how reminders are sent",
  parts: [
    "module/due-reminder-sending",
    "page-type/reminder",
    "service-workstation/send-due-reminders",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reminder is sent by a clock rather than by the person who wrote the reminder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reminder is sent as a page in akasha.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The service sending a reminder reads that reminder off the index.",
    },
  ],
} as const satisfies Domain
