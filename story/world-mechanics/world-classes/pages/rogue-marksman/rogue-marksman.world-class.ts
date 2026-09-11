import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const rogueMarksman = {
  id: "01a06586-0a23-724b-8e14-1717f8eb78aa",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "rogue-marksman",
  title: "Rogue Marksman",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
