import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const determinedNounPhrase = {
  id: "01a05db8-c094-785f-b7a0-c4718ee80aff",
  pageTypeSlug: "sentence-shape",
  slug: "determined-noun-phrase",
  definition: "a noun phrase opening with a determiner",
  rules: ["NP -> DET NOM"],
} as const satisfies SentenceShape
