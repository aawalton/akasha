import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type SeatPersona = Slug

export const seatPersona = {
  id: "01a06d69-cfb7-7d3a-a37e-094805ef6f45",
  pageTypeSlug: "relation-property",
  slug: "seat-persona",
  propertySlug: "persona",
  definition: "the persona a seat is held by",
  targetPageTypeSlug: "page-type/persona",
} as const satisfies RelationProperty
