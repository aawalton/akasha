import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const adjectiveBeforeNoun = {
  id: "01a05db8-c096-778b-a6b1-04bbf2692ab6",
  pageTypeSlug: "sentence-shape",
  slug: "adjective-before-noun",
  definition: "an adjective before the noun it describes",
  rules: ["NOM -> ADJ NOM"],
} as const satisfies SentenceShape
