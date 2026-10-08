import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mageKnights = {
  id: "01a0657e-0221-7b1f-8d16-037540d7e0c9",
  type: "page-type/world-class",
  slug: "mage-knights",
  title: "Mage Knights",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  aliases: ["Mage-Knights"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.033Z",
  updatedAt: "2026-09-22T13:29:27.000Z",
} as const satisfies WorldClass
