import type { Slug } from "../../../pages-system/page/properties/slug.text-property.ts"
import type { RelationProperty } from "../../../pages-system/relation-property/relation-property.page-type.ts"

export type PrincipalSeatName = Slug

export const principalSeatName = {
  id: "01a05439-6234-73fd-baf3-4e3b75e44f96",
  pageTypeSlug: "relation-property",
  slug: "principal-seat-name",
  propertySlug: "principal-seat-name",
  definition: "the seat that spawned this one",
  targetPageTypeSlug: "page-type/seat",
} as const satisfies RelationProperty
