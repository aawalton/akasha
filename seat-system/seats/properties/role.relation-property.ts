import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export type Role = Slug

export const role = {
  id: "01a05035-2609-769e-8bce-5f13a7ed3df4",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "role",
  propertySlug: "role",
  definition: "the role a persona works in, or a seat is answerable for",
  targetPageType: "page-type/role",
} as const satisfies RelationProperty
