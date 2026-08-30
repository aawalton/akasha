import type { Slug } from "../../../pages-system/page/properties/slug.text-property.ts"
import type { RelationProperty } from "../../../pages-system/relation-property/relation-property.page-type.ts"

export type PersonSlug = Slug

export const personAccessPersonSlug = {
  id: "01a05427-ec7b-7f27-8ea5-197566d62862",
  pageTypeSlug: "relation-property",
  slug: "person-access-person-slug",
  propertySlug: "person-slug",
  definition: "the person who holds the access",
  targetPageTypeSlug: "page-type/person",
} as const satisfies RelationProperty
