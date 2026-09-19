import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const graverobber = {
  id: "01a0657e-01e4-77a7-92e2-55520e593138",
  type: "page-type/world-class",
  slug: "graverobber",
  title: "Graverobber",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
