import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const loneNoun = {
  id: "01a05db8-c096-7305-a0dc-c5d69613d0fe",
  pageTypeSlug: "sentence-shape",
  slug: "lone-noun",
  definition: "a noun with no word beside it",
  rules: ["NOM -> N"],
} as const satisfies SentenceShape
