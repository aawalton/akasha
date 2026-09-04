import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const clauseAfterPreposition = {
  id: "01a05def-c4fe-70b6-85ab-fa91ec90a3d8",
  pageTypeSlug: "sentence-shape",
  slug: "clause-after-preposition",
  definition: "a whole clause where a preposition would take a noun",
  rules: ["PP -> PREP S"],
} as const satisfies SentenceShape
