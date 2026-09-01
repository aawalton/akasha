import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const quantifierInNominal = {
  id: "01a05def-c4fd-797e-ac56-231f0c046516",
  pageTypeSlug: "sentence-shape",
  slug: "quantifier-in-nominal",
  definition: "a quantifier between a determiner and the noun",
  rules: ["NOM -> QUANT NOM"],
} as const satisfies SentenceShape
