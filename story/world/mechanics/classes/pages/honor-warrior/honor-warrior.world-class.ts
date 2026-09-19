import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const honorWarrior = {
  id: "01a0657e-1374-7135-b162-952cead28983",
  type: "page-type/world-class",
  slug: "honor-warrior",
  title: "Honor Warrior",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
