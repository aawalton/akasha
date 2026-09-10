import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const parts = {
  id: "01a0877e-e1fa-73c7-909f-f872c144f719",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "parts",
  propertySlug: "parts",
  definition: "the domains this one is made of, in the order they are read",
  targetPageType: "page-type/domain",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page's parent is this edge inverted.",
    },
    {
      invariantKind: "departure",
      statement: "A page is named by exactly one parent.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
