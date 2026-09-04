import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const bareWh = {
  id: "01a05e1e-c81a-7e1c-aeb8-61366be8d107",
  pageTypeSlug: "sentence-shape",
  slug: "bare-wh",
  definition: "a question word used alone where a noun would be",
  rules: ["NP -> WH"],
} as const satisfies SentenceShape
