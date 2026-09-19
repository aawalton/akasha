import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const juniorDeckhand = {
  id: "01a0657e-020b-75de-9d67-f8479c4d07ad",
  type: "page-type/world-class",
  slug: "junior-deckhand",
  title: "Junior Deckhand",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
