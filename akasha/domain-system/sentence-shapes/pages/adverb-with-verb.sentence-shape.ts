import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const adverbWithVerb = {
  id: "01a05db8-c09a-7e2c-aa12-8a80c243ede3",
  pageTypeSlug: "sentence-shape",
  slug: "adverb-with-verb",
  definition: "an adverb before or after the verb phrase it changes",
  rules: ["VP -> ADV VP | VP ADV"],
} as const satisfies SentenceShape
