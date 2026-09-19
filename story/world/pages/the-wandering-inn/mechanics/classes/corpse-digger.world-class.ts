import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const corpseDigger = {
  id: "01a0657e-134f-717d-9333-d6bdab266ad9",
  type: "page-type/world-class",
  slug: "corpse-digger",
  title: "Corpse Digger",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
