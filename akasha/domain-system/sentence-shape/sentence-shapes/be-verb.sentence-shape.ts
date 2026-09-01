import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const beVerb = {
  id: "01a05db8-c098-794d-bcd0-3c8dd57c0db6",
  pageTypeSlug: "sentence-shape",
  slug: "be-verb",
  definition: "`be` followed by what the subject is",
  rules: ["VP -> BE NP | BE ADJP | BE PP | BE ADV"],
} as const satisfies SentenceShape
