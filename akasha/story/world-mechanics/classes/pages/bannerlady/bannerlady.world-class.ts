import type { WorldClass } from "../../world-class.page-type.ts"

export const bannerlady = {
  id: "01a0657e-01b0-7679-b240-ff65140f621b",
  pageTypeSlug: "world-class",
  slug: "bannerlady",
  title: "Bannerlady",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["warrior"],
  references: "jsonl",
} as const satisfies WorldClass
