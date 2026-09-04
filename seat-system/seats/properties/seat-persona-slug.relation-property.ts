import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type SeatPersonaSlug = Slug

export const seatPersonaSlug = {
  id: "01a06d69-cfb7-7d3a-a37e-094805ef6f45",
  pageTypeSlug: "relation-property",
  slug: "seat-persona-slug",
  propertySlug: "persona-slug",
  definition: "the persona a seat is held by",
  targetPageTypeSlug: "page-type/persona",
} as const satisfies RelationProperty
