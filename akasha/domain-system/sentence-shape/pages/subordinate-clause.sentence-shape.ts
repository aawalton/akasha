import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const subordinateClause = {
  id: "01a05de9-78a9-71cb-b4e2-464a4a2960c9",
  pageTypeSlug: "sentence-shape",
  slug: "subordinate-clause",
  definition: "a clause joined to another by a word saying when or why or whether",
  rules: ["S -> SUBC S | S SUBC", "VP -> VP SUBC", "SUBC -> SUBORD S | REL S"],
} as const satisfies SentenceShape
