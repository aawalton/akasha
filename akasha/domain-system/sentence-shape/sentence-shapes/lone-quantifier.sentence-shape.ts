import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const loneQuantifier = {
  id: "01a05dbf-e1d8-7c53-8118-ff93ef6f72a0",
  pageTypeSlug: "sentence-shape",
  slug: "lone-quantifier",
  definition: "a quantifier used where a noun would be",
  rules: ["NP -> QUANT"],
} as const satisfies SentenceShape
