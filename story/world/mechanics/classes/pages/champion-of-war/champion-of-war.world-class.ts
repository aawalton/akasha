import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const championOfWar = {
  id: "01a0657e-1347-719c-ac71-d610efc8d9eb",
  type: "page-type/world-class",
  slug: "champion-of-war",
  title: "Champion of War",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
