import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const unique = {
  id: "01a04edd-897d-7695-8047-3d1c855b750f",
  type: "page-type/relation-property",
  slug: "unique",
  propertySlug: "unique",
  definition: "the pages this property's value is unique among",
  targetPageType: "page-type/unique-kind",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A property stating no `unique` is not unique.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-29T18:52:16.637Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies RelationProperty
