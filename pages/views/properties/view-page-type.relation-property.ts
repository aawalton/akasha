import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export type ViewPageType = Slug

export const viewPageType = {
  id: "01a078d1-cb91-71c2-895b-d2fc87b9e79e",
  pageTypeSlug: "relation-property",
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
} as const satisfies RelationProperty
