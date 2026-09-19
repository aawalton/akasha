import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const potter = {
  id: "01a0657e-023e-714f-a7b2-4c7f424bc49f",
  type: "page-type/world-class",
  slug: "potter",
  title: "Potter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
