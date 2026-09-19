import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const battleAlchemists = {
  id: "01a0657e-133c-770e-aec0-1403b9d24fc2",
  type: "page-type/world-class",
  slug: "battle-alchemists",
  title: "Battle Alchemists",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
