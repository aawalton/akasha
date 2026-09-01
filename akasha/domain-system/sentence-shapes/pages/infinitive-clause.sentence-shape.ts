import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const infinitiveClause = {
  id: "01a05e1e-c819-701e-af02-18a33396821e",
  pageTypeSlug: "sentence-shape",
  slug: "infinitive-clause",
  definition: "a question word before `to` and a verb, used where a noun would be",
  rules: ["INF -> TO VB | TO V | TO V NP | TO V PP", "NP -> WH INF"],
} as const satisfies SentenceShape
