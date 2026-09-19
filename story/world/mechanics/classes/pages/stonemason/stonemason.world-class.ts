import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const stonemason = {
  id: "01a0657e-025f-7289-926b-12221758da5d",
  type: "page-type/world-class",
  slug: "stonemason",
  title: "Stonemason",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
