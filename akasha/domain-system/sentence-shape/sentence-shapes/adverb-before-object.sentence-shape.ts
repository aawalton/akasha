import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const adverbBeforeObject = {
  id: "01a05e1c-f21f-7239-bc86-9fb8aa9477a5",
  pageTypeSlug: "sentence-shape",
  slug: "adverb-before-object",
  definition: "an adverb between a verb and what the verb takes",
  rules: ["VP -> V ADV NP", "VP -> BE ADV NP", "VP -> BE ADV ADJP"],
} as const satisfies SentenceShape
