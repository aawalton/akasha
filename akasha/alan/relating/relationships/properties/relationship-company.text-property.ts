import type { TextProperty } from "@akasha/pages-system/text-property"

export type RelationshipCompany = string

export const relationshipCompany = {
  id: "01a06594-c6e2-72a2-bb5c-b44fd3a7898b",
  pageTypeSlug: "text-property",
  slug: "relationship-company",
  propertySlug: "relationship-company",
  definition: "where this person does that work",
  max: 20,
  nameFormatSlug: null,
} as const satisfies TextProperty
