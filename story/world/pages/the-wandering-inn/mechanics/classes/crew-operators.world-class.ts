import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const crewOperators = {
  id: "01a0657e-1350-75d1-a60f-597a9f1ad87a",
  type: "page-type/world-class",
  slug: "crew-operators",
  title: "Crew Operators",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
