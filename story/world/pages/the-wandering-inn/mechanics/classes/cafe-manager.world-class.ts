import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const cafeManager = {
  id: "01a0657e-1342-77a7-8f33-e3a6acd267ff",
  type: "page-type/world-class",
  slug: "cafe-manager",
  title: "Cafe Manager",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
