import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const ticker = {
  id: "01a0680a-1a00-7012-a936-8c5e1b7d1112",
  type: "page-type/text-property",
  slug: "ticker",
  propertySlug: "ticker",
  definition: "a security's short trading name",
  maxLength: 12,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
