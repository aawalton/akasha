import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const parts = {
  id: "01a0877e-e1fa-73c7-909f-f872c144f719",
  type: "relation-property",
  slug: "parts",
  propertySlug: "parts",
  definition: "the domains this one is made of",
  targetPageType: "page-type/domain",
  sorted: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page's parent is this edge inverted.",
    },
    {
      invariantKind: "departure",
      statement: "A page is named by exactly one parent.",
    },
    {
      invariantKind: "departure",
      statement: "A parts list is sorted by the whole `type/slug` a part is written as.",
    },
    {
      invariantKind: "gap",
      statement: "Every parts list already written is in that order.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
