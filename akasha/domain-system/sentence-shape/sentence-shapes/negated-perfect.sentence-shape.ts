import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const negatedPerfect = {
  id: "01a05e18-1fd4-7d9c-8ce2-bd4fd7d20b3d",
  pageTypeSlug: "sentence-shape",
  slug: "negated-perfect",
  definition: "a verb under `have` with `not` between them",
  rules: ["VP -> AUX NEG VEN | AUX NEG BE VEN"],
} as const satisfies SentenceShape
