import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const valueColor = {
  id: "01a06d7a-e9f7-7f1b-b0c4-15f3742e8352",
  type: "page-type/relation-property",
  slug: "value-color",
  propertySlug: "color",
  definition: "the color always drawn for a value",
  targetPageType: "page-type/color",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value is drawn in this color whatever a reading against that value says.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
