import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const battleMage = {
  id: "01a0657e-133d-7fb7-a792-308135d00673",
  type: "page-type/world-class",
  slug: "battle-mage",
  title: "Battle Mage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
