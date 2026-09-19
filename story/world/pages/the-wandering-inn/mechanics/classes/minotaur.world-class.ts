import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const minotaur = {
  id: "01a0657e-0233-72ea-9c7e-3298bec5f91f",
  type: "page-type/world-class",
  slug: "minotaur",
  title: "Minotaur",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
