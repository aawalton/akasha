import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const unique = {
  id: "01a04edd-897d-7695-8047-3d1c855b750f",
  type: "relation-property",
  slug: "unique",
  propertySlug: "unique",
  definition: "the pages this property's value is unique among",
  targetPageType: "page-type/unique-kind",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property stating no `unique` is not unique.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
