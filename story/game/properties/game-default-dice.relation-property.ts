import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const gameDefaultDice = {
  id: "01a0c490-c585-74e8-b05c-48c21336bcce",
  type: "page-type/relation-property",
  slug: "game-default-dice",
  propertySlug: "default-dice",
  definition: "the handful of dice a game reaches for where nothing names another",
  targetPageType: "page-type/game-mechanic",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A game naming no handful here asks for one at every roll.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
