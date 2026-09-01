import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const plainClause = {
  id: "01a05db8-c093-733f-9e63-5abd68037e57",
  pageTypeSlug: "sentence-shape",
  slug: "plain-clause",
  definition: "a subject followed by what is said about it",
  rules: ["S -> NP VP"],
} as const satisfies SentenceShape
