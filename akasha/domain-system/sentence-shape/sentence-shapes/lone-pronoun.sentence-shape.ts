import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const lonePronoun = {
  id: "01a05da1-d93d-795d-bf61-a2b20da998b7",
  pageTypeSlug: "sentence-shape",
  slug: "lone-pronoun",
  definition: "a pronoun or a quantifier naming something outside its own sentence",
  allowed: false,
  rules: ["NP -> PRON", "NP -> QUANT"],
  reason: "A reader needs something outside the sentence to know what it names.",
} as const satisfies SentenceShape
