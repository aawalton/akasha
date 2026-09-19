import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const iceQueen = {
  id: "01a0657e-1376-7382-ad2b-1ed8d85220b0",
  type: "page-type/world-class",
  slug: "ice-queen",
  title: "Ice Queen",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
