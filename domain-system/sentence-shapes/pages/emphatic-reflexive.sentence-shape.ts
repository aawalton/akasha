import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const emphaticReflexive = {
  id: "01a05e18-1fd2-7efc-a091-47adbe8b671a",
  pageTypeSlug: "sentence-shape",
  slug: "emphatic-reflexive",
  definition: "a reflexive next to a noun rather than in place of one",
  rules: ["NOM -> NOM SELF", "VP -> BE SELF NP"],
} as const satisfies SentenceShape
