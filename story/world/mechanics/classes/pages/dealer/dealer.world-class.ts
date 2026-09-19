import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const dealer = {
  id: "01a0657e-01ce-7f67-b18b-d9cca8884fcb",
  type: "page-type/world-class",
  slug: "dealer",
  title: "Dealer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
