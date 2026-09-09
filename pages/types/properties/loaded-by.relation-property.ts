import type { Slug } from "../../properties/slug.text-property.ts"
import type { RelationProperty } from "../../relation-properties/relation-property.page-type.ts"

export type LoadedBy = Slug

export const loadedBy = {
  id: "01a05234-e093-7966-b707-f7ac0f44d5e2",
  pageTypeSlug: "relation-property",
  slug: "loaded-by",
  propertySlug: "loaded-by",
  definition: "the module whose code loads pages of this type",
  targetPageType: "page-type/module",
} as const satisfies RelationProperty
