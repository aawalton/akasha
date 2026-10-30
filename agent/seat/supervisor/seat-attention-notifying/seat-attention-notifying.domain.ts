import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatAttentionNotifying = {
  id: "01a183e4-11f8-7279-b8e0-3c13c822d638",
  type: "page-type/domain",
  slug: "seat-attention-notifying",
  definition: "the notification a supervisor shows when a persona seat waits",
  parts: ["module/attention-notify-watch"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a seat the agents panel draws under personas shows a notification.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notification is shown by the seat's supervisor on the workstation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat shows none where no person's notice for it names the desktop.",
    },
  ],
  createdAt: "2026-10-28T19:02:04.535Z",
  updatedAt: "2026-10-30T14:44:05.445Z",
} as const satisfies Domain
