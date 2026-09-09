import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type CardPersona = Slug

export const cardPersona = {
  id: "01a06d59-446e-7c18-924f-2f3c7bc8f3e7",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "card-persona",
  propertySlug: "persona",
  definition: "the persona a card is of",
  targetPageType: "page-type/persona",
} as const satisfies RelationProperty
