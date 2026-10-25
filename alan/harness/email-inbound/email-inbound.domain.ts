import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const emailInbound = {
  id: "01a05bcd-25e2-7b0c-aff6-314192c66a72",
  type: "page-type/domain",
  slug: "email-inbound",
  definition: "how a new email is read",
  parts: [
    "module/agent-channel",
    "module/inbound-decision",
    "module/inbound-message",
    "module/persona-channels",
    "module/sender",
    "module/sender-handlers",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches a mail provider.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every judgement here is made from headers alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The channel addresses a decision reads are reached from akasha.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona's channel address is read off her own page rather than kept here.",
    },
  ],
  createdAt: "2026-09-01T07:09:26.370Z",
  updatedAt: "2026-10-25T19:20:54.262Z",
} as const satisfies Domain
