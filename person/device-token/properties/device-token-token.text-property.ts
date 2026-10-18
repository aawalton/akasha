import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const deviceTokenToken = {
  id: "01a05dc7-77da-7b07-affa-4c60ae0382fc",
  type: "page-type/text-property",
  slug: "device-token-token",
  propertySlug: "token",
  definition: "the value Apple delivers a push to",
  maxLength: 160,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Apple writes a token in upper hexadecimal and the token is kept as given.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-01T16:22:28.570Z",
  updatedAt: "2026-10-18T13:24:10.292Z",
} as const satisfies TextProperty
