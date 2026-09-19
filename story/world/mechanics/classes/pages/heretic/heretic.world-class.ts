import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const heretic = {
  id: "01a0657e-1373-70a5-b76e-bf7ba41ecebd",
  type: "page-type/world-class",
  slug: "heretic",
  title: "Heretic",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
