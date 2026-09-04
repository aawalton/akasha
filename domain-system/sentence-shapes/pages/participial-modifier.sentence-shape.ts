import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const participialModifier = {
  id: "01a05e05-24ea-7ebe-b96b-892c937ea8a8",
  pageTypeSlug: "sentence-shape",
  slug: "participial-modifier",
  definition: "a participle after the noun it describes",
  rules: ["NOM -> NOM PART", "PART -> VING | VING NP | VING PP | VEN NP | VEN PP | VEN PREP"],
} as const satisfies SentenceShape
