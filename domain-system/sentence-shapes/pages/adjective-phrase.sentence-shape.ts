import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const adjectivePhrase = {
  id: "01a05db8-c09b-7779-a1ee-c64fbe07790e",
  pageTypeSlug: "sentence-shape",
  slug: "adjective-phrase",
  definition: "an adjective, with an adverb before it or without",
  rules: ["ADJP -> ADJ | ADV ADJ"],
} as const satisfies SentenceShape
