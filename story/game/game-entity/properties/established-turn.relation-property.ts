import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const establishedTurn = {
  id: "01a0c63c-5aeb-7de0-9471-3e3ffc821155",
  type: "page-type/relation-property",
  slug: "established-turn",
  propertySlug: "established-turn",
  definition: "the turn a bond was formed on",
  targetPageType: "page-type/game-turn",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn a game holds is a page, and this names that page.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
