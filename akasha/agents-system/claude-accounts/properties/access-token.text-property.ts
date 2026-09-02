import type { TextProperty } from "@akasha/pages-system/text-property"

export type AccessToken = string

export const accessToken = {
  id: "01a054d8-1d39-7ce5-b138-6d39609810b0",
  pageTypeSlug: "text-property",
  slug: "access-token",
  propertySlug: "access-token",
  definition: "the token a call to Anthropic carries",
  max: 4000,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The access token stands in the page's sops file rather than in the page.",
    },
  ],
} as const satisfies TextProperty
