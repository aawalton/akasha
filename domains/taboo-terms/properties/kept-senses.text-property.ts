import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const keptSenses = {
  id: "01a05d78-f343-7862-8bea-66d8b696dedb",
  type: "text-property",
  slug: "kept-senses",
  propertySlug: "kept-senses",
  definition: "the meanings a word is written in",
  maxLength: 200,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "One list has every sense a term keeps.",
    },
    {
      invariantKind: "departure",
      statement: "A sense a term keeps is not a sense the term bars.",
    },
    {
      invariantKind: "departure",
      statement: "No two senses one term keeps are the same.",
    },
    {
      invariantKind: "absence",
      statement: "A kept sense names nothing to write in its place.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
