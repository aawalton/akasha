import type { Slug } from "../../pages/properties/slug.text-property.ts"
import type { RelationProperty } from "../../pages/relation-properties/relation-property.page-type.ts"

export type ChangeMode = Slug

export const changeMode = {
  id: "01a07c24-7fb6-7822-ae49-528d32267cb2",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "change-mode",
  propertySlug: "change-mode",
  definition: "the change mode a change is",
  targetPageType: "page-type/change-mode",
} as const satisfies RelationProperty
