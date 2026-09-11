import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const woodCutter = {
  id: "01a0657e-0272-7ff3-818e-e7847c2beb63",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "wood-cutter",
  title: "Wood Cutter",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
