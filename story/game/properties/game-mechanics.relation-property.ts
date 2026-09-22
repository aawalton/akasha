import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const gameMechanics = {
  id: "01a0c458-8d2c-7f1e-9a41-8200c8c04433",
  type: "page-type/relation-property",
  slug: "game-mechanics",
  propertySlug: "mechanics",
  definition: "a game's mechanics",
  targetPageType: "page-type/game-mechanic",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A game names a mechanic rather than a mechanic naming the games it is played in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two games name the same mechanic.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
