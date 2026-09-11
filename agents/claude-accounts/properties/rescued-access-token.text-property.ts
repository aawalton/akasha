import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const rescuedAccessToken = {
  id: "01a0637b-78ba-7119-9765-d08c368d42c0",
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
  types: "ts",
} as const satisfies TextProperty
