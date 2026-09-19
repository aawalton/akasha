import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const battleWarden = {
  id: "01a0657e-133d-7986-a336-66845ac6737d",
  type: "page-type/world-class",
  slug: "battle-warden",
  title: "Battle Warden",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
