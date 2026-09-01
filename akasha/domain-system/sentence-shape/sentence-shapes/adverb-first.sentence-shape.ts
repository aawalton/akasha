import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const adverbFirst = {
  id: "01a05da8-a37f-7a62-88f2-4e976eab419c",
  pageTypeSlug: "sentence-shape",
  slug: "adverb-first",
  definition: "an adverb put before the subject rather than beside the verb",
  rules: ["S -> ADV S"],
} as const satisfies SentenceShape
