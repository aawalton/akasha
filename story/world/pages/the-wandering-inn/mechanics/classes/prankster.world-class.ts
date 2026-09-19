import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const prankster = {
  id: "01a06586-0a0b-7b42-9e1a-b3ccfddb38a2",
  type: "page-type/world-class",
  slug: "prankster",
  title: "Prankster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
