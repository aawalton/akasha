import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const viewPageType = {
  id: "01a078d1-cb91-71c2-895b-d2fc87b9e79e",
  type: "relation-property",
  slug: "view-page-type",
  propertySlug: "page-type",
  definition: "the page type whose pages a view lists",
  targetPageType: "page-type/page-type",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A view names the page type by that page type's own slug.",
    },
    {
      invariantKind: "departure",
      statement: "A view naming a predicate instead names no page type here.",
    },
    {
      invariantKind: "departure",
      statement: "A view naming neither lists nothing.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
