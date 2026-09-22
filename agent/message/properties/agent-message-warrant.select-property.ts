import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const agentMessageWarrant = {
  id: "01a06818-107b-7002-8cb9-81d4d299a260",
  type: "page-type/select-property",
  slug: "agent-message-warrant",
  propertySlug: "warrant",
  definition: "what a message claims of the sender while it waits",
  values: ["announce", "blocked"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A blocked warrant claims the sender is waiting.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blocked warrant claims nothing of anyone but the sender.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An announced message claims nothing of the sender.",
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
} as const satisfies SelectProperty
