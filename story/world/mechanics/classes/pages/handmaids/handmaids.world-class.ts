import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const handmaids = {
  id: "01a0657e-01ee-7ce7-96c7-a4a27fa6f08a",
  type: "page-type/world-class",
  slug: "handmaids",
  title: "Handmaids",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
