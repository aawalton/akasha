import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const plainVerb = {
  id: "01a05db8-c098-76aa-8987-93ce61c75bd2",
  pageTypeSlug: "sentence-shape",
  slug: "plain-verb",
  definition: "a verb taking an object or a phrase or neither",
  rules: ["VP -> V | V NP | V PP", "VB -> V | V NP | V PP"],
} as const satisfies SentenceShape
