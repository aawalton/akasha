import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const agentMessageClaimedAt = {
  id: "01a06818-107b-7004-8256-c637bdc728bd",
  type: "page-type/instant-property",
  slug: "agent-message-claimed-at",
  propertySlug: "claimed-at",
  definition: "the time a recipient claims a message",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A message with no such instant is waiting to be read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A claim is released rather than taken back.",
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
  createdAt: "2026-09-03T16:26:42.683Z",
  updatedAt: "2026-10-19T18:17:55.458Z",
} as const satisfies InstantProperty
