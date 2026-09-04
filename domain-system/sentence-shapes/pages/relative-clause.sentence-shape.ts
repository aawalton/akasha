import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const relativeClause = {
  id: "01a05de9-78a7-7539-89f3-efa7928a4ced",
  pageTypeSlug: "sentence-shape",
  slug: "relative-clause",
  definition: "a clause after a noun saying which one is meant",
  rules: ["NOM -> NOM RELC", "RELC -> REL VP | REL NP VP | REL NOM VP | NP VP"],
} as const satisfies SentenceShape
