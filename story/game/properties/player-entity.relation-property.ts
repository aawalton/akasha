import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const playerEntity = {
  id: "01a0c672-20f9-7a90-bb66-260cb787c093",
  type: "page-type/relation-property",
  slug: "player-entity",
  propertySlug: "player",
  definition: "the one in a game's world the player runs",
  targetPageType: "page-type/game-entity",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A game names the one the player runs rather than leaving it read off a kind.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
