import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mageLord = {
  id: "01a0657e-1392-7c9e-8d9d-fdf5212c459b",
  type: "page-type/world-class",
  slug: "mage-lord",
  title: "Mage Lord",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
