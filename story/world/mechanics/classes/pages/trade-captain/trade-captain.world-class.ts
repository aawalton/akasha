import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const tradeCaptain = {
  id: "01a06586-0a69-715c-a95a-2efd7da89746",
  type: "page-type/world-class",
  slug: "trade-captain",
  title: "Trade Captain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
