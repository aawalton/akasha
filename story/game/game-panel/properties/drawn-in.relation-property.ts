import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const drawnIn = {
  id: "01a0c4c8-fe4c-7fa4-ae78-af86f4bbc920",
  type: "page-type/relation-property",
  slug: "drawn-in",
  propertySlug: "place",
  definition: "a panel's place in a played story's layout",
  targetPageType: "page-type/panel-place",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every panel names a place, so no panel is drawn nowhere.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
