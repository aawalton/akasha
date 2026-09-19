import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const battleClerics = {
  id: "01a0657e-133c-7704-9356-79585eee59e2",
  type: "page-type/world-class",
  slug: "battle-clerics",
  title: "Battle Clerics",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
