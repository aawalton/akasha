import type { TextProperty } from "@akasha/pages/text-property"

export type RescuedAccessToken = string

export const rescuedAccessToken = {
  id: "01a0637b-78ba-7119-9765-d08c368d42c0",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "rescued-access-token",
  propertySlug: "access-token",
  definition: "the access token a rescued credential has",
  maxLength: 4000,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rescued access token is the token the sops file did not take.",
    },
  ],
} as const satisfies TextProperty
