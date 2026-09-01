import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const loneDeterminer = {
  id: "01a05def-c4fe-72b3-95b3-cfd7e5157ced",
  pageTypeSlug: "sentence-shape",
  slug: "lone-determiner",
  definition: "a determiner used where a noun would be",
  rules: ["NP -> DET"],
} as const satisfies SentenceShape
