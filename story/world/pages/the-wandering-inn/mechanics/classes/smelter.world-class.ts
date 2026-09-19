import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const smelter = {
  id: "01a06586-0a43-7876-bb63-b83f7cfb0b8d",
  type: "page-type/world-class",
  slug: "smelter",
  title: "Smelter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
