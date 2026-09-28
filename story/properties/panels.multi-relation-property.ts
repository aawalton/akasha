import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const panels = {
  id: "01a0de26-1951-7113-998f-3eb408acf2e1",
  type: "page-type/multi-relation-property",
  slug: "panels",
  propertySlug: "panels",
  definition: "the panels a story shows beside its prose",
  targetPageType: "page-type/played-panel",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story naming no panel is drawn as its prose and nothing beside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two stories name the same panel where both are drawn with it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each panel says where it sits and its position there, so no order here counts.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
