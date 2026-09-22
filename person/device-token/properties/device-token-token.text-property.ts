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
    {
      decisionKind: "decision-kind/departure",
      statement: "A token for a live activity runs longer than a token for a device.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The length here admits the longer of the two rather than one length for each.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
