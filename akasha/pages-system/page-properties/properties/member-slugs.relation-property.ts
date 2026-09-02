import type { PagePropertySlug } from "../../page-types/properties/page-property-slug.relation-property.ts"
import type { RelationProperty } from "../../relation-properties/relation-property.page-type.ts"
import type { List } from "../page-property.page-type.ts"

export type MemberSlugs = List<PagePropertySlug>

export const memberSlugs = {
  id: "01a062b2-e0c9-78a5-b56b-6dc7519eded7",
  pageTypeSlug: "relation-property",
  slug: "member-slugs",
  propertySlug: "member-slugs",
  definition: "a slug naming a property a one-of property admits a value of",
  targetPageTypeSlug: "page-type/page-property",
} as const satisfies RelationProperty
