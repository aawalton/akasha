import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const agentMessageWarrant = {
  id: "01a06818-107b-7002-8cb9-81d4d299a260",
  type: "page-type/select-property",
  slug: "agent-message-warrant",
  propertySlug: "warrant",
  definition: "what a message says of the sender while it waits",
  values: ["announce", "blocked"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A blocked warrant says the sender is waiting.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blocked warrant says nothing of anyone but the sender.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An announced message says nothing of the sender.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An announce is not a reason for its sender to keep running.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer to a blocked message reaches the sender's mailbox.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:26:42.683Z",
  updatedAt: "2026-10-19T18:10:45.688Z",
} as const satisfies SelectProperty
