import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const partitiveQuantifier = {
  id: "01a05dbf-e1d9-7c3c-bbef-a99bc4bf3d63",
  pageTypeSlug: "sentence-shape",
  slug: "partitive-quantifier",
  definition: "a quantifier followed by the phrase naming what it is part of",
  allowed: false,
  rules: ["NP -> QUANT PP"],
  reason: "A quantifier and the phrase it is part of are two steps where naming the thing is one.",
} as const satisfies SentenceShape
