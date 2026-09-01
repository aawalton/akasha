import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const nounBeforeNoun = {
  id: "01a05db8-c097-7ebf-94f8-7b3a996c1067",
  pageTypeSlug: "sentence-shape",
  slug: "noun-before-noun",
  definition: "a noun before the noun it names a kind of",
  rules: ["NOM -> N NOM"],
} as const satisfies SentenceShape
