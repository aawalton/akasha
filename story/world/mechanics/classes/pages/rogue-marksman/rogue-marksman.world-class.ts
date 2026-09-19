import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const rogueMarksman = {
  id: "01a06586-0a23-724b-8e14-1717f8eb78aa",
  type: "page-type/world-class",
  slug: "rogue-marksman",
  title: "Rogue Marksman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
