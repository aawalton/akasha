import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const coordination = {
  id: "01a05de9-78a8-7855-a2ea-28ad86d9f3d2",
  pageTypeSlug: "sentence-shape",
  slug: "coordination",
  definition: "two things of one kind joined by `and` or `or`",
  rules: [
    "NP -> NP CONJ NP",
    "NOM -> NOM CONJ NOM",
    "VP -> VP CONJ VP",
    "ADJP -> ADJP CONJ ADJP",
    "S -> S CONJ S",
  ],
} as const satisfies SentenceShape
