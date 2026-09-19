import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const earthMage = {
  id: "01a0657e-1359-7a8e-a1a7-68749d04b6fa",
  type: "page-type/world-class",
  slug: "earth-mage",
  title: "Earth Mage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
