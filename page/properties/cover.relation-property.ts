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
      statement: "Nobody sets a cover by hand other than a character's or a place's cover.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A played turn's cover is the picture a recorder made of that turn.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-30T17:00:31.266Z",
  updatedAt: "2026-10-04T09:23:17.000Z",
} as const satisfies RelationProperty
