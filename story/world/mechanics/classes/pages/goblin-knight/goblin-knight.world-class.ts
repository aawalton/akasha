import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const goblinKnight = {
  id: "01a0657e-01e2-7318-9202-b27a3677d38c",
  type: "page-type/world-class",
  slug: "goblin-knight",
  title: "Goblin Knight",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
