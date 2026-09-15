import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const emailInbound = {
  id: "01a05bcd-25e2-7b0c-aff6-314192c66a72",
  type: "domain",
  slug: "email-inbound",
  definition: "what an arriving email is read into before anything acts on it",
  parts: [
    "module/agent-channel",
    "module/inbound-decision",
    "module/inbound-message",
    "module/persona-channels",
    "module/sender",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a mail provider.",
    },
    {
      invariantKind: "departure",
      statement: "Every judgement here is made from headers alone.",
    },
    {
      invariantKind: "gap",
      statement: "The channel addresses a decision reads are reached from akasha.",
    },
    {
      invariantKind: "departure",
      statement: "A persona's channel address is read off her own page rather than kept here.",
    },
  ],
} as const satisfies Domain
