import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const miner = {
  id: "01a0657e-13a2-7735-83d4-d88943a026c3",
  type: "page-type/world-class",
  slug: "miner",
  title: "Miner",
  world: "world/the-wandering-inn",
  appearanceCount: 34,
  aliases: ["miners"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.514Z",
  updatedAt: "2026-09-22T13:29:35.000Z",
} as const satisfies WorldClass
