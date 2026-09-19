import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const tavernToughs = {
  id: "01a0657e-0269-78ac-a7ff-10866fbb24ea",
  type: "page-type/world-class",
  slug: "tavern-toughs",
  title: "Tavern Toughs",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
