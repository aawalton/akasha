import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pirateLord = {
  id: "01a06586-0a07-78c2-a13c-2f10f674be67",
  type: "page-type/world-class",
  slug: "pirate-lord",
  title: "Pirate Lord",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
