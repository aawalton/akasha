import type { TextProperty } from "@akasha/pages-system/text-property"

export type RefreshToken = string

export const refreshToken = {
  id: "01a054d8-1d39-7d36-b315-c5558e91c93c",
  pageTypeSlug: "text-property",
  slug: "refresh-token",
  propertySlug: "refresh-token",
  definition: "the token a fresh access token is asked for with",
  max: 4000,
  nameFormatSlug: null,
} as const satisfies TextProperty
