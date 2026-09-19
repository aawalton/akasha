import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const explorer = {
  id: "01a0657e-1361-7ea6-804c-d4d123936091",
  type: "page-type/world-class",
  slug: "explorer",
  title: "Explorer",
  world: "world/the-wandering-inn",
  aliases: ["explorers"],
  references: "jsonl",
} as const satisfies WorldClass
