import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const takes = {
  id: "01a05027-c468-7573-9eec-f4d1ecd0bced",
  type: "text-property",
  slug: "takes",
  propertySlug: "takes",
  definition: "what one thing a command takes is for",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The takes text sits on one line beside the said text.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
