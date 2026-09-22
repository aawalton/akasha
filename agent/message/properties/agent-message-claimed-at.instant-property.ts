import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const agentMessageClaimedAt = {
  id: "01a06818-107b-7004-8256-c637bdc728bd",
  type: "page-type/instant-property",
  slug: "agent-message-claimed-at",
  propertySlug: "claimed-at",
  definition: "when a recipient took a message up to read it",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A message with no such instant is waiting to be read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A claim is let go rather than taken back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message whose claim is let go waits again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A claim sits outside the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A claim goes when its message goes.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
