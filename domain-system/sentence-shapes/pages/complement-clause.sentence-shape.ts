import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const complementClause = {
  id: "01a05e18-1fd3-70a5-9a48-674146b3fbbc",
  pageTypeSlug: "sentence-shape",
  slug: "complement-clause",
  definition: "a clause after `be` saying what the subject is",
  rules: ["VP -> BE CLAUSE", "CLAUSE -> REL S"],
} as const satisfies SentenceShape
