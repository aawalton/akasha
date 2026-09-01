import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const compoundPreposition = {
  id: "01a05deb-2cf1-7953-95d0-2863f3c3f26b",
  pageTypeSlug: "sentence-shape",
  slug: "compound-preposition",
  definition: "a preposition followed by another preposition",
  rules: ["PP -> PREP PP"],
} as const satisfies SentenceShape
