import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const strandedCopula = {
  id: "01a05ded-df27-7c8d-82f8-79a890406948",
  pageTypeSlug: "sentence-shape",
  slug: "stranded-copula",
  definition: "a clause ending in `be` with nothing after it",
  rules: ["NP -> WH NP BE", "RELC -> REL NP BE"],
} as const satisfies SentenceShape
