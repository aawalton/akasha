import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const readableTrait = {
  id: "01a0c647-b128-79cf-ac79-1fc82beaa792",
  type: "page-type/text-property",
  slug: "readable-trait",
  propertySlug: "readable-trait",
  definition: "what an encounter shows that a player can read, and what reading it wins",
  maxLength: 3000,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The trait is written for the game master, who gives the player what shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An encounter a player cannot read out is beaten by force alone.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
