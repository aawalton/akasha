import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const negatedCoordination = {
  id: "01a05def-c4fe-769f-a486-2d9ed1b4c2a2",
  pageTypeSlug: "sentence-shape",
  slug: "negated-coordination",
  definition: "two things joined by `and` or `or` with the second negated",
  rules: [
    "NP -> NP CONJ NEG NP",
    "VP -> VP CONJ NEG VP",
    "PP -> PP CONJ NEG PP",
    "NOM -> NOM CONJ NEG NOM",
  ],
} as const satisfies SentenceShape
