import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const refreshToken = {
  id: "01a054d8-1d39-7d36-b315-c5558e91c93c",
  type: "page-type/text-property",
  slug: "refresh-token",
  propertySlug: "refresh-token",
  definition: "the token that renews an access token",
  maxLength: 4000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
