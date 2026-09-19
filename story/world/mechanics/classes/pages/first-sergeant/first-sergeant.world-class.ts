import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const firstSergeant = {
  id: "01a0657e-1364-7be5-bf97-0786d7365ef4",
  type: "page-type/world-class",
  slug: "first-sergeant",
  title: "First Sergeant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
