import type { Slug } from "../../../pages-system/page/properties/slug.text-property.ts"
import type { RelationProperty } from "../../../pages-system/relation-property/relation-property.page-type.ts"

export type PersonaSlug = Slug

export const personaSlug = {
  id: "01a04e58-5735-7549-8b6b-adb9d3ff999c",
  pageTypeSlug: "relation-property",
  slug: "persona-slug",
  propertySlug: "persona-slug",
  definition: "the persona whose work this is",
  targetPageTypeSlug: "page-type/persona",
} as const satisfies RelationProperty
