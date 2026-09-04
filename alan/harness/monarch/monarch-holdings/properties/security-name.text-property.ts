import type { TextProperty } from "@akasha/pages-system/text-property"

export type SecurityName = string

export const securityName = {
  id: "01a0680a-1a00-7011-8b27-4e6c9d2f1111",
  pageTypeSlug: "text-property",
  slug: "security-name",
  propertySlug: "security-name",
  definition: "what the fund or share a holding is of is called",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
