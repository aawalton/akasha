import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const playerId = {
  id: "01a06596-f0d5-7007-a70d-0e2e56b9aacd",
  type: "page-type/text-property",
  slug: "player-id",
  propertySlug: "player-id",
  definition: "the player whose card it is",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/stopgap",
      statement: "Two of the three players named here are pages and the third is not.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to a player.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
