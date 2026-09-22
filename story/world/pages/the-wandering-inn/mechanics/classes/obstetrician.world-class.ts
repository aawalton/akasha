import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const obstetrician = {
  id: "01a0657e-13b3-7d42-9936-8fad7b27739c",
  type: "page-type/world-class",
  slug: "obstetrician",
  title: "Obstetrician",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
} as const satisfies WorldClass
