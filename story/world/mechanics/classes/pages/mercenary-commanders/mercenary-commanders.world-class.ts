import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mercenaryCommanders = {
  id: "01a0657e-0231-72ad-9a37-89d9cec8997c",
  type: "page-type/world-class",
  slug: "mercenary-commanders",
  title: "Mercenary Commanders",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
