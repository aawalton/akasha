import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const whDegree = {
  id: "01a05e1e-c818-7b4d-9109-44d2ca6bd7d2",
  pageTypeSlug: "sentence-shape",
  slug: "wh-degree",
  definition: "a question word asking how much of something, opening a clause used as a noun",
  rules: ["WHP -> WH ADJ | WH ADV | WH QUANT NOM", "NP -> WHP NP VP | WHP VP"],
} as const satisfies SentenceShape
