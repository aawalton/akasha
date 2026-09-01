import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const indefiniteAlone = {
  id: "01a05db8-c095-75df-b838-89a49e87a058",
  pageTypeSlug: "sentence-shape",
  slug: "indefinite-alone",
  definition: "an indefinite pronoun used where a noun would be",
  rules: ["NP -> INDEF"],
} as const satisfies SentenceShape
