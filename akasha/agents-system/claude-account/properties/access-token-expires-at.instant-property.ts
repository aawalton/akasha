import type { InstantProperty } from "../../../pages-system/instant-property/instant-property.page-type.ts"

export type AccessTokenExpiresAt = string

export const accessTokenExpiresAt = {
  id: "01a054d8-1d39-7a13-9019-5f9bf19f051e",
  pageTypeSlug: "instant-property",
  slug: "access-token-expires-at",
  propertySlug: "access-token-expires-at",
  definition: "when the access token stops being accepted",
} as const satisfies InstantProperty
