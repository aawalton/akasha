import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const general = {
  id: "01a0657e-136b-721a-8442-bfd68222daf3",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "general",
  title: "General",
  world: "the-wandering-inn",
  aliases: ["generals"],
  evolvesFromSlugs: ["warrior"],
  references: "jsonl",
} as const satisfies WorldClass
