import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const juggernauts = {
  id: "01a0657e-020b-7de8-93b7-3f98fea5e0e8",
  type: "page-type/world-class",
  slug: "juggernauts",
  title: "Juggernauts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
