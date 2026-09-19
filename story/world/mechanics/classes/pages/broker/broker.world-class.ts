import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const broker = {
  id: "01a0657e-1340-78d2-a3d1-e9e9a7c376f0",
  type: "page-type/world-class",
  slug: "broker",
  title: "Broker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
