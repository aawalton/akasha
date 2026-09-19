import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const journeymen = {
  id: "01a0657e-020b-78ed-9a6f-312728bbe0a0",
  type: "page-type/world-class",
  slug: "journeymen",
  title: "Journeymen",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
