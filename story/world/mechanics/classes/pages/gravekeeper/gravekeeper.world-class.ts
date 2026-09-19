import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gravekeeper = {
  id: "01a0657e-136e-794d-826a-bff1483cfb53",
  type: "page-type/world-class",
  slug: "gravekeeper",
  title: "Gravekeeper",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
