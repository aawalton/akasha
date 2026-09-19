import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const battleCaptains = {
  id: "01a0657e-133c-700d-b84f-a86ce1070db1",
  type: "page-type/world-class",
  slug: "battle-captains",
  title: "Battle Captains",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
