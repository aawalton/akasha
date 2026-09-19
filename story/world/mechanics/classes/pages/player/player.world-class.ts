import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const player = {
  id: "01a0657e-023e-773e-b956-5c5723fe00c0",
  type: "page-type/world-class",
  slug: "player",
  title: "Player",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
