import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const royalKnights = {
  id: "01a06586-0a26-7374-afc0-910fe1a4dfac",
  type: "page-type/world-class",
  slug: "royal-knights",
  title: "Royal Knights",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
