import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const alchemist = {
  id: "01a0657e-132c-7326-8d6a-bcf58f9bca62",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "alchemist",
  title: "Alchemist",
  world: "the-wandering-inn",
  aliases: ["alchemists"],
  references: "jsonl",
} as const satisfies WorldClass
