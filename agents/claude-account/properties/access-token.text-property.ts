import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const accessToken = {
  id: "01a054d8-1d39-7ce5-b138-6d39609810b0",
  type: "text-property",
  slug: "access-token",
  propertySlug: "access-token",
  definition: "the token a call to Anthropic carries",
  maxLength: 4000,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The access token sits in the page's sops file rather than in the page.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
