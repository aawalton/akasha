import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const verbParticle = {
  id: "01a05ded-df25-705c-9ede-dabd8cb033fe",
  pageTypeSlug: "sentence-shape",
  slug: "verb-particle",
  definition: "a verb followed by a preposition with no noun after it",
  rules: [
    "VENP -> VEN PREP",
    "VP -> BE VENP | BE VENP PP",
    "VP -> V PREP | V PREP NP | V NP PREP",
    "VB -> V PREP | V PREP NP",
    "VP -> VP CONTRAST VENP",
  ],
} as const satisfies SentenceShape
