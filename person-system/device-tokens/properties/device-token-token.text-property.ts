import type { TextProperty } from "@akasha/pages-system/text-property"

export type Token = string

export const deviceTokenToken = {
  id: "01a05dc7-77da-7b07-affa-4c60ae0382fc",
  pageTypeSlug: "text-property",
  slug: "device-token-token",
  propertySlug: "token",
  definition: "the value Apple delivers a push to",
  max: 64,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "Apple writes a token in upper hexadecimal and the token is kept as given.",
    },
  ],
} as const satisfies TextProperty
