import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const monsterHunter = {
  id: "01a0657e-13a3-7d97-9d50-dee3b46a9fd1",
  type: "page-type/world-class",
  slug: "monster-hunter",
  title: "Monster Hunter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
