import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const panels = {
  id: "01a0de26-1951-7113-998f-3eb408acf2e1",
  type: "page-type/multi-relation-property",
  slug: "panels",
  propertySlug: "panels",
  definition: "the panels a story played shows on its play screen, in the order they are drawn",
  targetPageType: "page-type/game-panel",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A story played naming no panel is drawn as its run of prose and nothing beside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two stories played name the same panel where both are drawn with it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each panel says where it sits, and the order here is the order within that place.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
