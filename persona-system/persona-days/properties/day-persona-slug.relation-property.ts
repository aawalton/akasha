import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type DayPersonaSlug = Slug

export const dayPersonaSlug = {
  id: "01a06d62-a9d5-7373-8c90-8fa8149177e7",
  pageTypeSlug: "relation-property",
  slug: "day-persona-slug",
  propertySlug: "persona-slug",
  definition: "the persona whose earnings a day holds",
  targetPageTypeSlug: "page-type/persona",
} as const satisfies RelationProperty
