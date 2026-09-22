import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const gameAttributes = {
  id: "01a0c48b-86e0-7f2b-8243-18250c6f5d6d",
  type: "page-type/relation-property",
  slug: "game-attributes",
  propertySlug: "attributes",
  definition: "the attributes giving a character in a game a number",
  targetPageType: "page-type/game-attribute",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A game names every attribute its characters are made of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two games name the same attribute where both are made of it.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
