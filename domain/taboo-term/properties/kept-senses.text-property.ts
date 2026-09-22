import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const keptSenses = {
  id: "01a05d78-f343-7862-8bea-66d8b696dedb",
  type: "page-type/text-property",
  slug: "kept-senses",
  propertySlug: "kept-senses",
  definition: "the meanings a word keeps",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One list has every sense a term keeps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sense a term keeps is not a sense the term bars.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No two senses one term keeps are the same.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A kept sense names nothing to write in its place.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
