import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const prepositionalPhrase = {
  id: "01a05db8-c098-701f-9449-178f24e5a559",
  pageTypeSlug: "sentence-shape",
  slug: "prepositional-phrase",
  definition: "a preposition followed by a noun phrase",
  rules: ["PP -> PREP NP"],
} as const satisfies SentenceShape
