import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const diehardWarriors = {
  id: "01a0657e-01cf-7588-b2ee-2439e8591080",
  type: "page-type/world-class",
  slug: "diehard-warriors",
  title: "Diehard Warriors",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
