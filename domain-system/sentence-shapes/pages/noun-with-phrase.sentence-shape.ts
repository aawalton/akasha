import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const nounWithPhrase = {
  id: "01a05db8-c095-77a1-a225-81c838456c39",
  pageTypeSlug: "sentence-shape",
  slug: "noun-with-phrase",
  definition: "a noun phrase followed by a prepositional phrase",
  rules: ["NP -> NP PP"],
} as const satisfies SentenceShape
