import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type RoleSlug = Slug

export const roleSlug = {
  id: "01a05035-2609-769e-8bce-5f13a7ed3df4",
  pageTypeSlug: "relation-property",
  slug: "role-slug",
  propertySlug: "role-slug",
  definition: "the role a persona works in, or a seat is answerable for",
  targetPageTypeSlug: "page-type/role",
} as const satisfies RelationProperty
