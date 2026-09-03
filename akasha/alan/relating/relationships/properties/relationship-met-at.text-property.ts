import type { TextProperty } from "@akasha/pages-system/text-property"

export type RelationshipMetAt = string

export const relationshipMetAt = {
  id: "01a06594-c6e2-7649-be6d-67118c210228",
  pageTypeSlug: "text-property",
  slug: "relationship-met-at",
  propertySlug: "relationship-met-at",
  definition: "where Alan first met this person",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
