import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const demonHunter = {
  id: "01a0657e-1352-7886-bf74-6b152ba817c4",
  type: "page-type/world-class",
  slug: "demon-hunter",
  title: "Demon Hunter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
