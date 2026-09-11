import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const relationshipCompany = {
  id: "01a06594-c6e2-72a2-bb5c-b44fd3a7898b",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "relationship-company",
  propertySlug: "relationship-company",
  definition: "where this person does that work",
  maxLength: 20,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
