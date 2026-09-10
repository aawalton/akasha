import type { Slug } from "../../properties/slug.text-property.ts"
import type { RelationProperty } from "../../relation-properties/relation-property.page-type.types.ts"

export type PageProperty = Slug

export const pageProperty = {
  id: "01a04df3-6847-78ba-a32d-216da05c58ee",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "page-property",
  propertySlug: "page-property",
  definition: "a slug naming a page property",
  targetPageType: "page-type/page-property",
} as const satisfies RelationProperty
