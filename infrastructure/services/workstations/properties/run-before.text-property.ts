import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const runBefore = {
  id: "01a08e05-9daa-7242-9729-db7176f0c70d",
  type: "text-property",
  slug: "run-before",
  propertySlug: "before",
  definition: "a word placed before the runner in a command",
  maxLength: 200,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The words are placed in the order the words are in.",
    },
    {
      invariantKind: "departure",
      statement: "A word here wraps the run rather than being handed to the module.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
