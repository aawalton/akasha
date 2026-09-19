import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const knightCommander = {
  id: "01a0657e-020d-743a-9878-753d4c27ed56",
  type: "page-type/world-class",
  slug: "knight-commander",
  title: "Knight-Commander",
  world: "world/the-wandering-inn",
  aliases: ["Knight Commander"],
  references: "jsonl",
} as const satisfies WorldClass
