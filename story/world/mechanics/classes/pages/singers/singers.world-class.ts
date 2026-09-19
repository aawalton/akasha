import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const singers = {
  id: "01a06586-0a3e-7b63-a87b-bbf5377dca1a",
  type: "page-type/world-class",
  slug: "singers",
  title: "Singers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
