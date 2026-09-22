import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const gamePanels = {
  id: "01a0c49e-d544-7d82-b738-6f3b187194a0",
  type: "page-type/multi-relation-property",
  slug: "game-panels",
  propertySlug: "panels",
  definition: "the panels a game's interface is made of, in the order they are drawn",
  targetPageType: "page-type/game-panel",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A game naming no panel is drawn as its run of prose and nothing beside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two games name the same panel where both are drawn with it.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
