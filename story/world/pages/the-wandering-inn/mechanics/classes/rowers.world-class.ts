import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const rowers = {
  id: "01a06586-0a26-77b5-925b-28a68a83d579",
  type: "page-type/world-class",
  slug: "rowers",
  title: "Rowers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
