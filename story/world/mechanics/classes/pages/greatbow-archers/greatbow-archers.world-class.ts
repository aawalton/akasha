import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const greatbowArchers = {
  id: "01a0657e-01e4-7df5-aeff-db6f0b04eb21",
  type: "page-type/world-class",
  slug: "greatbow-archers",
  title: "Greatbow Archers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
