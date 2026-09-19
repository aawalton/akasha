import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shipCook = {
  id: "01a06586-0a3b-7de0-b93c-7aead1448081",
  type: "page-type/world-class",
  slug: "ship-cook",
  title: "Ship Cook",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
