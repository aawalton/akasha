import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type RefreshToken = string

export const refreshToken = {
  id: "01a054d8-1d39-7d36-b315-c5558e91c93c",
  pageTypeSlug: "text-property",
  slug: "refresh-token",
  propertySlug: "refresh-token",
  definition: "the token a fresh access token is asked for with",
  max: 4000,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "This outlives the access token it renews.",
    },
  ],
} as const satisfies TextProperty
