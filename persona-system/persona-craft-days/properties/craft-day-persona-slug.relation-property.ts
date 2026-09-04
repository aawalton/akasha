import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type CraftDayPersonaSlug = Slug

export const craftDayPersonaSlug = {
  id: "01a06d64-245e-7283-aa0e-ca4eda4dd326",
  pageTypeSlug: "relation-property",
  slug: "craft-day-persona-slug",
  propertySlug: "persona-slug",
  definition: "the persona who did the crafting on a day",
  targetPageTypeSlug: "page-type/persona",
} as const satisfies RelationProperty
