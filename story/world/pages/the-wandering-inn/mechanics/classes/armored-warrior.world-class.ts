import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const armoredWarrior = {
  id: "01a0657e-1330-7df7-8f5c-a72b515fde1a",
  type: "page-type/world-class",
  slug: "armored-warrior",
  title: "Armored Warrior",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
