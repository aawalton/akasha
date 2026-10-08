import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const dragonslayer = {
  id: "01a0657e-1356-75fa-b2e7-c4df47332d1e",
  type: "page-type/world-class",
  slug: "dragonslayer",
  title: "Dragonslayer",
  world: "world/the-wandering-inn",
  appearanceCount: 8,
  aliases: ["DRAGONSLAYER"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.438Z",
  updatedAt: "2026-09-22T13:28:56.000Z",
} as const satisfies WorldClass
