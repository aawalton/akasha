import type { TextProperty } from "@akasha/pages-system/text-property"

export type RelationshipRole = string

export const relationshipRole = {
  id: "01a0658a-f4df-7d69-bdc1-a4c5c7dcd8e0",
  pageTypeSlug: "text-property",
  slug: "relationship-role",
  propertySlug: "relationship-role",
  definition: "the work this person does",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
