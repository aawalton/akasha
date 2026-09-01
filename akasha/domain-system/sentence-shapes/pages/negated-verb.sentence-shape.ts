import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const negatedVerb = {
  id: "01a05def-c4fc-7915-864a-9dec67a73a14",
  pageTypeSlug: "sentence-shape",
  slug: "negated-verb",
  definition: "a verb with `never` or `not` before it",
  rules: ["VP -> NEG VP"],
} as const satisfies SentenceShape
