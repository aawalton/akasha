import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const coverDescription = {
  id: "01a0e9a7-a91c-7a87-aff4-ce28b127a720",
  type: "page-type/text-property",
  slug: "cover-description",
  propertySlug: "cover-description",
  definition:
    "a character's face and hair as that character's cover shows them, in the words of a picture",
  maxLength: 600,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A picture edited from a character's cover names that character's face in these words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character's cover and the cover's description change together.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
