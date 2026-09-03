import type { TextProperty } from "@akasha/pages-system/text-property"

export type RelationshipAliases = string

export const relationshipAliases = {
  id: "01a0658a-f4df-7e21-b0ff-aff4c50b6a89",
  pageTypeSlug: "text-property",
  slug: "relationship-aliases",
  propertySlug: "relationship-aliases",
  definition: "the other names this person is called by",
  max: 20,
  nameFormatSlug: null,
} as const satisfies TextProperty
