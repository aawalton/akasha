import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const monsterHunters = {
  id: "01a0657e-0233-74d2-97e4-0ec82c9e86ba",
  type: "page-type/world-class",
  slug: "monster-hunters",
  title: "Monster Hunters",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
