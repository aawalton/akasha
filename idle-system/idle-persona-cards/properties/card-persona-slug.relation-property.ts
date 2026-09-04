import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type CardPersonaSlug = Slug

export const cardPersonaSlug = {
  id: "01a06d59-446e-7c18-924f-2f3c7bc8f3e7",
  pageTypeSlug: "relation-property",
  slug: "card-persona-slug",
  propertySlug: "persona-slug",
  definition: "the persona a card is of",
  targetPageTypeSlug: "page-type/persona",
} as const satisfies RelationProperty
