import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const freeRelative = {
  id: "01a05de9-78a8-74c3-8d30-8ab376cf820b",
  pageTypeSlug: "sentence-shape",
  slug: "free-relative",
  definition: "a clause used where a noun would be",
  rules: ["NP -> WH VP | WH NOM VP | WH NP VP"],
} as const satisfies SentenceShape
