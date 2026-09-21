import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const droppedReward = {
  id: "01a0c647-f617-7073-b780-e750fb447f14",
  type: "page-type/text-property",
  slug: "dropped-reward",
  propertySlug: "drop",
  definition: "what an encounter leaves behind for the player to take",
  maxLength: 500,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An encounter leaving nothing says nothing here.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
