import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const verbWithPhrase = {
  id: "01a05db8-c09a-7f73-a4ac-d81160c0beb1",
  pageTypeSlug: "sentence-shape",
  slug: "verb-with-phrase",
  definition: "a verb phrase followed by a prepositional phrase",
  rules: ["VP -> VP PP"],
} as const satisfies SentenceShape
