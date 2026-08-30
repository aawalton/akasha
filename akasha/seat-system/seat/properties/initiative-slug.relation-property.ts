import type { Slug } from "../../../pages-system/page/properties/slug.text-property.ts"
import type { RelationProperty } from "../../../pages-system/relation-property/relation-property.page-type.ts"

export type InitiativeSlug = Slug

export const initiativeSlug = {
  id: "01a05434-9bb8-79f5-9cfe-48b7bb0dbdc9",
  pageTypeSlug: "relation-property",
  slug: "initiative-slug",
  propertySlug: "initiative-slug",
  definition: "the initiative a seat is working on",
  targetPageTypeSlug: "page-type/initiative",
  invariants: [
    {
      invariantKind: "stopgap",
      statement:
        "A slug here is checked against the old system's files rather than the initiatives standing in akasha.",
    },
  ],
} as const satisfies RelationProperty
