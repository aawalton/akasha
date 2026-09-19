import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const dragonslayer = {
  id: "01a0657e-1356-75fa-b2e7-c4df47332d1e",
  type: "page-type/world-class",
  slug: "dragonslayer",
  title: "Dragonslayer",
  world: "world/the-wandering-inn",
  aliases: ["DRAGONSLAYER"],
  references: "jsonl",
} as const satisfies WorldClass
