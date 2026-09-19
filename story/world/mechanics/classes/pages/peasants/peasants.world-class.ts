import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const peasants = {
  id: "01a0657e-13b6-77a7-8d78-e78c3ecc7201",
  type: "page-type/world-class",
  slug: "peasants",
  title: "Peasants",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
