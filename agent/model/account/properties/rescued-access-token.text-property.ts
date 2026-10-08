import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const rescuedAccessToken = {
  id: "01a0637b-78ba-7119-9765-d08c368d42c0",
  type: "page-type/text-property",
  slug: "rescued-access-token",
  propertySlug: "access-token",
  definition: "the access token a rescued credential has",
  maxLength: 4000,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The rescued access token is the token the sops file did not take.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T18:57:11.354Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies TextProperty
