import type { Slug } from "../../pages/properties/slug.text-property.ts"
import type { RelationProperty } from "../../pages/relation-properties/relation-property.page-type.ts"

export type ChangeModeSlug = Slug

export const changeModeSlug = {
  id: "01a07c24-7fb6-7822-ae49-528d32267cb2",
  pageTypeSlug: "relation-property",
  slug: "change-mode-slug",
  propertySlug: "change-mode-slug",
  definition: "the change mode a change is",
  targetPageTypeSlug: "page-type/change-mode",
} as const satisfies RelationProperty
