import type { TextProperty } from "@akasha/pages/text-property"

export type AccessToken = string

export const accessToken = {
  id: "01a054d8-1d39-7ce5-b138-6d39609810b0",
  pageTypeSlug: "text-property",
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
} as const satisfies TextProperty
