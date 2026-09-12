import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const placeholder = {
  id: "01a093fd-6bbc-77a2-ba27-0fc290cf93b0",
  type: "text-property",
  slug: "placeholder",
  propertySlug: "placeholder",
  definition: "the word naming what an argument's value is, where that argument is shown",
  maxLength: 40,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The word is written without the angle brackets it is shown in.",
    },
    {
      invariantKind: "departure",
      statement: "An argument carrying no value names no word here.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
