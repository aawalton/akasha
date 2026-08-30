import type { Slug } from "../../page/properties/slug.text-property.ts"
import type { RelationProperty } from "../../relation-property/relation-property.page-type.ts"

export type PagePropertySlug = Slug

export const pagePropertySlug = {
  id: "01a04df3-6847-78ba-a32d-216da05c58ee",
  pageTypeSlug: "relation-property",
  slug: "page-property-slug",
  propertySlug: "page-property-slug",
  definition: "a slug naming a page property",
  targetPageTypeSlug: "page-type/page-property",
} as const satisfies RelationProperty
