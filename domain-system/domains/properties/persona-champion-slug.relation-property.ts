import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type PersonaChampionSlug = Slug

export const personaChampionSlug = {
  id: "01a06935-8f86-7abe-be8b-bc2ac74facaa",
  pageTypeSlug: "relation-property",
  slug: "persona-champion-slug",
  propertySlug: "persona-champion-slug",
  definition: "the persona who champions a domain",
  targetPageTypeSlug: "page-type/persona",
} as const satisfies RelationProperty
