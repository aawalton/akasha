import type { TextProperty } from "@akasha/pages-system/text-property"

export type RelationshipCompany = string

export const relationshipCompany = {
  id: "01a0658a-f4df-7309-83cf-b985f043c03f",
  pageTypeSlug: "text-property",
  slug: "relationship-company",
  propertySlug: "relationship-company",
  definition: "where this person does that work",
  max: 20,
  nameFormatSlug: null,
} as const satisfies TextProperty
