import type { TextProperty } from "@akasha/pages-system/text-property"

export type RelationshipAliases = string

export const relationshipAliases = {
  id: "01a06594-c6e2-7efb-89d9-2041bf2f81e1",
  pageTypeSlug: "text-property",
  slug: "relationship-aliases",
  propertySlug: "relationship-aliases",
  definition: "the other names this person is called by",
  max: 20,
  nameFormatSlug: null,
} as const satisfies TextProperty
