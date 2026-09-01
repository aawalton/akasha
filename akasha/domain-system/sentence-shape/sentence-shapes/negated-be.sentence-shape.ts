import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const negatedBe = {
  id: "01a05db8-c099-7024-a55b-764dd9d9d006",
  pageTypeSlug: "sentence-shape",
  slug: "negated-be",
  definition: "`be` followed by `not` and what the subject is not",
  rules: ["VP -> BE NEG NP | BE NEG ADJP | BE NEG VEN | BE NEG ADV"],
} as const satisfies SentenceShape
