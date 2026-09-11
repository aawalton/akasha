import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const nav = {
  id: "01a0680d-4d00-7001-8a73-4f2c6d9e4102",
  type: "relation-property",
  slug: "nav",
  propertySlug: "nav",
  definition: "the nav item a view sits under",
  targetPageType: "page-type/nav",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A view belongs to the nav item that owns that view and is drawn nowhere else.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
