import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const woodCutter = {
  id: "01a0657e-0272-7ff3-818e-e7847c2beb63",
  type: "page-type/world-class",
  slug: "wood-cutter",
  title: "Wood Cutter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
