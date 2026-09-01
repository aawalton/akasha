import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const reflexiveAlone = {
  id: "01a05db8-c095-73d8-87e4-016379779164",
  pageTypeSlug: "sentence-shape",
  slug: "reflexive-alone",
  definition: "a reflexive pronoun used where a noun would be",
  rules: ["NP -> SELF"],
} as const satisfies SentenceShape
