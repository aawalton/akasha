import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const madQueen = {
  id: "01a0657e-0221-7d2c-a410-76095c8df3f0",
  type: "page-type/world-class",
  slug: "mad-queen",
  title: "Mad Queen",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
