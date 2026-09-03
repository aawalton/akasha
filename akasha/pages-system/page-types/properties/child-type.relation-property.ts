import type { Slug } from "../../pages/properties/slug.text-property.ts"
import type { RelationProperty } from "../../relation-properties/relation-property.page-type.ts"

export type ChildType = Slug

export const childType = {
  id: "01a0683a-620a-753d-8ea2-a84aa847d5f4",
  pageTypeSlug: "relation-property",
  slug: "child-type",
  propertySlug: "child-type",
  definition: "the page type of the pages a page gathers",
  targetPageTypeSlug: "page-type/page-type",
} as const satisfies RelationProperty
