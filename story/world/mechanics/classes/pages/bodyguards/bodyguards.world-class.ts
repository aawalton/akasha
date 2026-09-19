import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bodyguards = {
  id: "01a0657e-01bf-7d06-bc34-c3c98df2689f",
  type: "page-type/world-class",
  slug: "bodyguards",
  title: "Bodyguards",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
