import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type ComponentSlug = Slug

export const componentSlug = {
  id: "01a05480-1c87-7234-89bb-4e8776905c5c",
  pageTypeSlug: "relation-property",
  slug: "component-slug",
  propertySlug: "component-slug",
  definition: "the component a tile is drawn in",
  targetPageTypeSlug: "page-type/ios-component",
} as const satisfies RelationProperty
