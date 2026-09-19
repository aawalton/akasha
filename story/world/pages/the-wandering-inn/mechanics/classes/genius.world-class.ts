import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const genius = {
  id: "01a0657e-136b-7e15-bb59-16d4b1cb6f6f",
  type: "page-type/world-class",
  slug: "genius",
  title: "Genius",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
