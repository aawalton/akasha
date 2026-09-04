import type { TextProperty } from "@akasha/pages-system/text-property"

export type RescuedAccessToken = string

export const rescuedAccessToken = {
  id: "01a0637b-78ba-7119-9765-d08c368d42c0",
  pageTypeSlug: "text-property",
  slug: "rescued-access-token",
  propertySlug: "access-token",
  definition: "the access token a rescued credential carries",
  max: 4000,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rescued access token is the token the sops file did not take.",
    },
  ],
} as const satisfies TextProperty
