import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type RescuedRefreshToken = string

export const rescuedRefreshToken = {
  id: "01a0637b-78bb-75b3-997f-1bd076da5799",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "rescued-refresh-token",
  propertySlug: "refresh-token",
  definition: "the refresh token a rescued credential carries",
  maxLength: 4000,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rescued refresh token is the token the sops file did not take.",
    },
  ],
} as const satisfies TextProperty
