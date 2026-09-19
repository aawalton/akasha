import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const barDrunk = {
  id: "01a0657e-1339-70d4-b4c6-f341e7cccbeb",
  type: "page-type/world-class",
  slug: "bar-drunk",
  title: "Bar Drunk",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
