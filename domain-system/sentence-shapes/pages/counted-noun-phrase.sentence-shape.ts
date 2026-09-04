import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const countedNounPhrase = {
  id: "01a05db8-c094-70f4-8d85-203d1e163ce8",
  pageTypeSlug: "sentence-shape",
  slug: "counted-noun-phrase",
  definition: "a noun phrase opening with a quantifier",
  rules: ["NP -> QUANT NOM"],
} as const satisfies SentenceShape
