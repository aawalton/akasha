import type { TextProperty } from "@akasha/pages-system/text-property"

export type RelationshipRole = string

export const relationshipRole = {
  id: "01a06594-c6e2-75eb-8bd5-a0c19b9a661b",
  pageTypeSlug: "text-property",
  slug: "relationship-role",
  propertySlug: "relationship-role",
  definition: "the work this person does",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
