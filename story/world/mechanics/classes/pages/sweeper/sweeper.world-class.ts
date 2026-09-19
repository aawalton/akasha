import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sweeper = {
  id: "01a0657e-0262-708e-a7e8-00c1caf936df",
  type: "page-type/world-class",
  slug: "sweeper",
  title: "Sweeper",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
