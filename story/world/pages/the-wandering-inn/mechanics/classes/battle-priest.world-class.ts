import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const battlePriest = {
  id: "01a0657e-01b6-776e-8ad1-0d0922105ca4",
  type: "page-type/world-class",
  slug: "battle-priest",
  title: "Battle Priest",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
