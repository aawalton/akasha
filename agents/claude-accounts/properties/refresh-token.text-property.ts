import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type RefreshToken = string

export const refreshToken = {
  id: "01a054d8-1d39-7d36-b315-c5558e91c93c",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "refresh-token",
  propertySlug: "refresh-token",
  definition: "the token a fresh access token is asked for with",
  maxLength: 4000,
  nameFormat: null,
} as const satisfies TextProperty
