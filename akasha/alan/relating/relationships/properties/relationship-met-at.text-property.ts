import type { TextProperty } from "@akasha/pages-system/text-property"

export type RelationshipMetAt = string

export const relationshipMetAt = {
  id: "01a0658a-f4df-76fa-8b1d-6e7f0b9fcdd4",
  pageTypeSlug: "text-property",
  slug: "relationship-met-at",
  propertySlug: "relationship-met-at",
  definition: "where Alan first met this person",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
