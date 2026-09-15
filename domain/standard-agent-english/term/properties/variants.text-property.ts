import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const variants = {
  id: "01a08249-f82c-7f1b-8203-9dcefa386e51",
  type: "page-type/text-property",
  slug: "variants",
  propertySlug: "variants",
  definition: "another spelling of a term, differing from the plainest only by grammar",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A term states every spelling a reader meets it under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The plainest spelling is stated once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No variant repeats the plainest spelling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spelling no variant states is a spelling nothing finds.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
