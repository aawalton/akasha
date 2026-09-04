import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const edWordBeforeNoun = {
  id: "01a05db8-c097-7129-8839-b1bee0a037e7",
  pageTypeSlug: "sentence-shape",
  slug: "ed-word-before-noun",
  definition: "a word ending in `ed` before the noun it describes",
  rules: ["NOM -> VEN NOM"],
} as const satisfies SentenceShape
