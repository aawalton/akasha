import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const agentMessageTo = {
  id: "01a06818-107b-7000-9af9-d98a9e34ceed",
  type: "page-type/relation-property",
  slug: "agent-message-to",
  propertySlug: "to",
  definition: "the seat a message is addressed to",
  targetPageType: "page-type/seat",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A message addressed to a name no seat has is refused rather than written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recipient is one name rather than a path.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
