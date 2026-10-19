import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const agentMessageInjectedAt = {
  id: "01a0d652-bbb9-7252-8ef6-26cdf5726d81",
  type: "page-type/instant-property",
  slug: "agent-message-injected-at",
  propertySlug: "injected-at",
  definition: "the time a message is shown to the recipient",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A claimed message with such an instant has reached its recipient.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A claim with such an instant is never released to send its message again.",
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
  createdAt: "2026-09-25T02:09:01.369Z",
  updatedAt: "2026-10-19T18:17:55.458Z",
} as const satisfies InstantProperty
