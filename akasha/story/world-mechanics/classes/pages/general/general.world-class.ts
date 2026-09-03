import type { WorldClass } from "../../world-class.page-type.ts"

export const general = {
  id: "01a0657e-136b-721a-8442-bfd68222daf3",
  pageTypeSlug: "world-class",
  slug: "general",
  title: "General",
  worldSlug: "the-wandering-inn",
  aliases: ["generals"],
  evolvesFromSlugs: ["warrior"],
  references: "jsonl",
} as const satisfies WorldClass
