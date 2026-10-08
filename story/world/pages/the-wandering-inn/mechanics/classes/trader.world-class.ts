import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const trader = {
  id: "01a06586-0a69-7ae5-8aa1-0b279ce2630e",
  type: "page-type/world-class",
  slug: "trader",
  title: "Trader",
  world: "world/the-wandering-inn",
  appearanceCount: 80,
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.441Z",
  updatedAt: "2026-09-22T13:30:22.000Z",
} as const satisfies WorldClass
