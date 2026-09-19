import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const forager = {
  id: "01a0657e-1365-7dbe-a151-6a88ceb937b4",
  type: "page-type/world-class",
  slug: "forager",
  title: "Forager",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
