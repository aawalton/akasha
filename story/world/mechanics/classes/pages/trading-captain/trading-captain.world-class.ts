import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const tradingCaptain = {
  id: "01a06586-0a6a-761b-851a-e13bda46192b",
  type: "page-type/world-class",
  slug: "trading-captain",
  title: "Trading Captain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
