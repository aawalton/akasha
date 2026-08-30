import type { Slug } from "../../page/properties/slug.text-property.ts"
import type { RelationProperty } from "../../relation-property/relation-property.page-type.ts"

export type LoadedBySlug = Slug

export const loadedBySlug = {
  id: "01a05234-e093-7966-b707-f7ac0f44d5e2",
  pageTypeSlug: "relation-property",
  slug: "loaded-by-slug",
  propertySlug: "loaded-by-slug",
  definition: "the module whose code loads pages of this type",
  targetPageTypeSlug: "page-type/module",
} as const satisfies RelationProperty
