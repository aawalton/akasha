import type { Slug } from "../../../pages-system/page/properties/slug.text-property.ts"
import type { RelationProperty } from "../../../pages-system/relation-property/relation-property.page-type.ts"

export type ComponentSlug = Slug

export const componentSlug = {
  id: "01a05480-1c87-7234-89bb-4e8776905c5c",
  pageTypeSlug: "relation-property",
  slug: "component-slug",
  propertySlug: "component-slug",
  definition: "the component a tile is drawn in",
  targetPageTypeSlug: "page-type/ios-component",
} as const satisfies RelationProperty
