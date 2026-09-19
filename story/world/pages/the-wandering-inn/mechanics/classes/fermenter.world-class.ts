import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fermenter = {
  id: "01a0657e-1364-7af3-85d1-78931eb6cea7",
  type: "page-type/world-class",
  slug: "fermenter",
  title: "Fermenter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
