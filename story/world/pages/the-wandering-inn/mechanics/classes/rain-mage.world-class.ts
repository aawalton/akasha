import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const rainMage = {
  id: "01a0657e-0243-7ad9-9b09-8d0eac460088",
  type: "page-type/world-class",
  slug: "rain-mage",
  title: "Rain Mage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
