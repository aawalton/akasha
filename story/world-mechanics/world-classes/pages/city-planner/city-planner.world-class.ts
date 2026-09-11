import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const cityPlanner = {
  id: "01a0657e-01c6-7be4-9360-34e0fcdc0fae",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "city-planner",
  title: "City Planner",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
