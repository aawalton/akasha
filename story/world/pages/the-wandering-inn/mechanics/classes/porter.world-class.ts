import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const porter = {
  id: "01a0657e-023e-72b5-85b1-b674f8d4cb7f",
  type: "page-type/world-class",
  slug: "porter",
  title: "Porter",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
} as const satisfies WorldClass
