import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type RelationshipMetAt = string

export const relationshipMetAt = {
  id: "01a06594-c6e2-7649-be6d-67118c210228",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "relationship-met-at",
  propertySlug: "relationship-met-at",
  definition: "where Alan first met this person",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
