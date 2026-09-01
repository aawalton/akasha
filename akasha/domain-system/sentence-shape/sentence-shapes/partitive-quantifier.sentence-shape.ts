import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const partitiveQuantifier = {
  id: "01a05dbf-e1d9-7c3c-bbef-a99bc4bf3d63",
  pageTypeSlug: "sentence-shape",
  slug: "partitive-quantifier",
  definition: "a quantifier followed by the phrase naming what it is part of",
  rules: ["NP -> QUANT PP"],
} as const satisfies SentenceShape
