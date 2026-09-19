import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const kingOfRiches = {
  id: "01a0657e-020c-7a8e-b034-5aa38acf4a7c",
  type: "page-type/world-class",
  slug: "king-of-riches",
  title: "King of Riches",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
