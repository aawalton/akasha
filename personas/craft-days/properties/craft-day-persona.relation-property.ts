import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type CraftDayPersona = Slug

export const craftDayPersona = {
  id: "01a06d64-245e-7283-aa0e-ca4eda4dd326",
  pageTypeSlug: "relation-property",
  slug: "craft-day-persona",
  propertySlug: "persona",
  definition: "the persona who did the crafting on a day",
  targetPageType: "page-type/persona",
} as const satisfies RelationProperty
