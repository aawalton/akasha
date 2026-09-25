import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const rescuedRefreshToken = {
  id: "01a0637b-78bb-75b3-997f-1bd076da5799",
  type: "page-type/text-property",
  slug: "rescued-refresh-token",
  propertySlug: "refresh-token",
  definition: "the refresh token in a rescued credential",
  maxLength: 4000,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The rescued refresh token is the token the sops file did not take.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
