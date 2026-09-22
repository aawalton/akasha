import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const royalBaker = {
  id: "01a06586-0a26-7789-a1af-cf2fb6e1e958",
  type: "page-type/world-class",
  slug: "royal-baker",
  title: "Royal Baker",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
} as const satisfies WorldClass
