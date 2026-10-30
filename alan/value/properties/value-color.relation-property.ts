import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const valueColor = {
  id: "01a06d7a-e9f7-7f1b-b0c4-15f3742e8352",
  type: "page-type/relation-property",
  slug: "value-color",
  propertySlug: "color",
  definition: "the color of a life value",
  targetPageType: "page-type/color",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A life value is drawn in this color whatever number that life value has.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-04T17:32:46.967Z",
  updatedAt: "2026-10-30T16:38:27.222Z",
} as const satisfies RelationProperty
