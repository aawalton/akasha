import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const barbarians = {
  id: "01a0657e-01b0-77f2-9b9c-40b4c557474c",
  type: "page-type/world-class",
  slug: "barbarians",
  title: "Barbarians",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
