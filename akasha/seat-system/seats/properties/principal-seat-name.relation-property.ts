import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type PrincipalSeatName = Slug

export const principalSeatName = {
  id: "01a05439-6234-73fd-baf3-4e3b75e44f96",
  pageTypeSlug: "relation-property",
  slug: "principal-seat-name",
  propertySlug: "principal-seat-name",
  definition: "the seat that spawned this one",
  targetPageTypeSlug: "page-type/seat",
} as const satisfies RelationProperty
