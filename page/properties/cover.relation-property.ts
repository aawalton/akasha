import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const cover = {
  id: "01a0539d-94a2-71f8-83d3-2c8cd1f8db2e",
  type: "page-type/relation-property",
  slug: "cover",
  propertySlug: "cover",
  definition: "the image that represents a page",
  targetPageType: "page-type/image",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nobody sets a cover by hand.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
