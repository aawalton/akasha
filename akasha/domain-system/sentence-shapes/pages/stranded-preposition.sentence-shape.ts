import type { SentenceShape } from "../sentence-shape.page-type.ts"

export const strandedPreposition = {
  id: "01a05deb-2cf0-788f-9eb4-713344e4632a",
  pageTypeSlug: "sentence-shape",
  slug: "stranded-preposition",
  definition: "a clause ending in the preposition its noun belongs to",
  rules: ["RELC -> NP VP PREP | REL NP VP PREP | REL VP PREP", "NP -> WH NP VP PREP"],
} as const satisfies SentenceShape
