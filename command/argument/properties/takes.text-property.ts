import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const takes = {
  id: "01a05027-c468-7573-9eec-f4d1ecd0bced",
  type: "page-type/text-property",
  slug: "takes",
  propertySlug: "takes",
  definition: "what a thing a command takes is for",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The takes text sits on one line beside the said text.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
