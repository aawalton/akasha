import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const bareNounPhrase = {
  id: "01a05db8-c094-7b0d-b81e-8707201896a9",
  pageTypeSlug: "sentence-shape",
  slug: "bare-noun-phrase",
  definition: "a noun phrase with no word before the noun",
  rules: ["NP -> NOM"],
} as const satisfies SentenceShape
