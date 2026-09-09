import type { TextProperty } from "@akasha/pages/text-property"

export type Variants = string

export const variants = {
  id: "01a08249-f82c-7f1b-8203-9dcefa386e51",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "variants",
  propertySlug: "variants",
  definition: "another spelling of a term, differing from the plainest only by grammar",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A term states every spelling a reader meets it under.",
    },
    {
      invariantKind: "departure",
      statement: "The plainest spelling is stated once, and no variant repeats it.",
    },
    {
      invariantKind: "departure",
      statement: "A spelling no variant states is a spelling nothing finds.",
    },
  ],
} as const satisfies TextProperty
