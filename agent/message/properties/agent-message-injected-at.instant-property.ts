import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const agentMessageInjectedAt = {
  id: "01a0d652-bbb9-7252-8ef6-26cdf5726d81",
  type: "page-type/instant-property",
  slug: "agent-message-injected-at",
  propertySlug: "injected-at",
  definition: "when a recipient's transcript was first seen holding a message",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A claimed message with such an instant has reached its recipient.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A claim with such an instant is never let go to send its message again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such an instant sits outside the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such an instant goes when its message or its claim goes.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
