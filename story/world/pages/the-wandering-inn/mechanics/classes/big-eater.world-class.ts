import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bigEater = {
  id: "01a0657e-133e-79cf-885f-be6b2d9825ad",
  type: "page-type/world-class",
  slug: "big-eater",
  title: "Big Eater",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
