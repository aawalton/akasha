import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type PersonaSlug = Slug

export const personaSlug = {
  id: "01a04e58-5735-7549-8b6b-adb9d3ff999c",
  pageTypeSlug: "relation-property",
  slug: "persona-slug",
  propertySlug: "persona-slug",
  definition: "the persona whose work this is",
  targetPageTypeSlug: "page-type/persona",
} as const satisfies RelationProperty
