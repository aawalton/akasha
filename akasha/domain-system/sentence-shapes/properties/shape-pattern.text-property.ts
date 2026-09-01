import type { TextProperty } from "@akasha/pages-system/text-property"

export type ShapePattern = string

export const shapePattern = {
  id: "01a05e8e-b843-7255-b6b2-33115cfe103d",
  pageTypeSlug: "text-property",
  slug: "shape-pattern",
  propertySlug: "pattern",
  definition: "the regular expression a sentence shape is found by in the words themselves",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pattern is read against the sentence rather than against the parse.",
    },
    {
      invariantKind: "departure",
      statement: "A pattern states a shape no grammar rule holds.",
    },
    {
      invariantKind: "departure",
      statement: "A pattern refuses a sentence the grammar calls plain.",
    },
    {
      invariantKind: "departure",
      statement: "What a pair of backticks holds is blanked before a pattern is read.",
    },
    {
      invariantKind: "departure",
      statement: "A pattern belongs to one sentence shape.",
    },
    {
      invariantKind: "absence",
      statement: "A pattern admits nothing.",
    },
  ],
} as const satisfies TextProperty
