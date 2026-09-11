import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const runArgument = {
  id: "01a08e05-b1ce-7d00-9ef8-6357b1462cc9",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "run-argument",
  propertySlug: "arguments",
  definition: "a word a command hands over after the pages that command names",
  maxLength: 500,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The words are handed over in the order the words are in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A word naming a file of this repository is named as a page rather than written here.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
