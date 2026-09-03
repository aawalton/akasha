import type { WorldClass } from "../../world-class.page-type.ts"

export const greatChieftain = {
  id: "01a0657e-136e-7493-8a07-02b40bbcd93e",
  pageTypeSlug: "world-class",
  slug: "great-chieftain",
  title: "Great Chieftain",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["goblin-lord-solstice-rags-of-change"],
  references: "jsonl",
} as const satisfies WorldClass
