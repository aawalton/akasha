import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const battlefieldHealer = {
  id: "01a0657e-01b6-729e-a1bf-e2b8d4835834",
  type: "page-type/world-class",
  slug: "battlefield-healer",
  title: "Battlefield Healer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
