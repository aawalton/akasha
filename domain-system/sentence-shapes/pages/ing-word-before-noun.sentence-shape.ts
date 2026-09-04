import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const ingWordBeforeNoun = {
  id: "01a05db8-c097-71b0-a374-62e1942ef4d1",
  pageTypeSlug: "sentence-shape",
  slug: "ing-word-before-noun",
  definition: "a word ending in `ing` before the noun it describes",
  rules: ["NOM -> VING NOM"],
} as const satisfies SentenceShape
